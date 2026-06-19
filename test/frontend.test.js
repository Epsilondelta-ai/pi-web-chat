import test from "node:test";
import assert from "node:assert/strict";
import { Window } from "happy-dom";
import { AsyncSubject, BehaviorSubject, ReplaySubject, Subject } from "rxjs";
import activate, {
  backendCall,
  chatEventsToAgUiLikeEvents,
  commandName,
  createAgUiLikeRunInput,
  createChannels,
  createChatDom,
  extractRefs,
  formatShellOutput,
  getActiveWorkspaceId,
  hasQueuedAttachmentNames,
  mergeCommands,
  pluginStyleText,
  promptFromAgUiLikeRunInput,
  renderMessages,
  setComposerMode,
  shellAttachmentNoteVisible,
  submittedAttachmentsForText,
} from "./.generated/index.js";

const STEERING_CANCEL_WAIT_MS = 140;

function createPiWeb() {
  const subjects = new Map();
  const kinds = new Map();

  function typed(name, kind, factory) {
    if (subjects.has(name)) {
      assert.equal(kinds.get(name), kind);
      return subjects.get(name);
    }

    const subject = factory();
    subjects.set(name, subject);
    kinds.set(name, kind);
    return subject;
  }

  return {
    version: "test",
    subject: (name) => typed(name, "subject", () => new Subject()),
    behaviorSubject: (name, initial) => typed(name, "behavior", () => new BehaviorSubject(initial)),
    replaySubject: (name, bufferSize = 1) => typed(name, "replay", () => new ReplaySubject(bufferSize)),
    asyncSubject: (name) => typed(name, "async", () => new AsyncSubject()),
    hasSubject: (name) => subjects.has(name),
    deleteSubject: (name) => subjects.delete(name),
    completeSubject: (name) => subjects.get(name)?.complete(),
    listSubjects: () => [...subjects.keys()],
  };
}

test("AG-UI-like adapter maps internal chat events without runtime dependency", () => {
  const run = createAgUiLikeRunInput("thread-1", "run-1", [{ id: "m1", role: "user", text: "hello", createdAt: 1 }]);
  const prompt = promptFromAgUiLikeRunInput(run);
  const events = chatEventsToAgUiLikeEvents([
    { type: "text.delta", delta: "hi" },
    { type: "thinking.delta", delta: "reason" },
    { type: "tool.start", toolCallId: "t1", toolName: "bash", args: { command: "pwd" } },
  ], "thread-1", "run-1");

  assert.equal(prompt.text, "hello");
  assert.deepEqual(events.map((event) => event.type), ["TEXT_MESSAGE_CONTENT", "THINKING_MESSAGE_CONTENT", "TOOL_CALL_START"]);
  assert.equal(events[2].toolCallId, "t1");
});

test("legacy renderMessages respects tool argument status labels", () => {
  const window = new Window();
  const previousDocument = globalThis.document;
  globalThis.document = window.document;
  try {
    const container = window.document.createElement("div");
    renderMessages(container, [{
      id: "a1",
      role: "assistant",
      text: "",
      createdAt: 1,
      toolCalls: [
        { id: "t1", name: "read", args: { _truncated: true }, argsStatus: "truncated", text: "", status: "ok" },
        { id: "t2", name: "legacy", argsStatus: "unavailable", text: "", status: "ok" },
        { id: "t3", name: "noop", argsStatus: "empty", text: "", status: "ok" },
        { id: "t4", name: "huge", argsStatus: "omitted", text: "", status: "ok" },
      ],
    }]);

    assert.deepEqual(Array.from(container.getElementsByTagName("pre")).slice(1).map((item) => item.textContent), [
      "arguments truncated: too large to display",
      "arguments unavailable",
      "no arguments",
      "arguments omitted: response too large",
    ]);
  } finally {
    globalThis.document = previousDocument;
  }
});

test("command utilities keep chat command behavior", () => {
  assert.equal(commandName({ command: "/a" }), "/a");
  assert.equal(commandName({ cmd: "/b" }), "/b");
  assert.equal(commandName({ name: "c" }), "/c");
  assert.deepEqual(mergeCommands([{ command: "/a" }], [{ command: "/a" }, { command: "/b" }]).map(commandName), ["/a", "/b"]);
  assert.deepEqual(extractRefs("use @README.md and `@ignored` @src/app.ts @README.md"), ["README.md", "src/app.ts"]);
});

test("shell command utilities drop submitted attachments and cap output", () => {
  const attachments = [{ name: "note.txt", content: "hello" }];
  const normal = submittedAttachmentsForText("ask pi", attachments);
  const shell = submittedAttachmentsForText("   ! pwd", attachments);
  const formatted = formatShellOutput("pwd", "x".repeat(70000), 0, 5, false);

  assert.deepEqual(shell, []);
  assert.deepEqual(normal, attachments);
  assert.notEqual(normal, attachments);
  assert.match(formatted, /\[exit 0 · 5ms · truncated\]/);
  assert.ok(formatted.length < 65050);
  assert.equal(hasQueuedAttachmentNames(["note.txt"]), true);
  assert.equal(hasQueuedAttachmentNames([]), false);
  assert.equal(shellAttachmentNoteVisible("! pwd", true), true);
  assert.equal(shellAttachmentNoteVisible("! pwd", false), false);
  assert.equal(shellAttachmentNoteVisible("ask pi", true), false);
});

test("plugin styles target mounted chat surfaces", () => {
  const styles = pluginStyleText();
  assert.match(styles, /pi-web-chat-surface/);
  assert.match(styles, /pi-web-chat-composer/);
  assert.match(styles, /prefix\.tool/);
  assert.match(styles, /body\.sys/);
  assert.match(styles, /resize: none/);
  assert.match(styles, /focus-visible/);
  assert.match(styles, /data-composer-mode="shell"[\s\S]*pi-web-chat-attachments[\s\S]*display: none/);
  assert.match(styles, /data-composer-mode="shell"\]\[data-shell-attachments\][\s\S]*pi-web-chat-shell-note[\s\S]*display: block/);
  assert.match(styles, /prompt-bar\.shell-mode \.attach-btn[\s\S]*var\(--warning, #facc15\)/);
  assert.match(styles, /prompt-bar\.shell-mode \.send-btn[\s\S]*var\(--warning, #facc15\)/);
  assert.match(styles, /composer-spinner[\s\S]*animation: pi-web-chat-composer-spin/);
  assert.match(styles, /composer-spinner[\s\S]*border-right-color: transparent/);
  assert.match(styles, /@keyframes pi-web-chat-terminal-spinner/);
  assert.match(styles, /spinner span[\s\S]*animation: pi-web-chat-terminal-spinner/);
  assert.doesNotMatch(styles, /spinner\[data-frame/);
  assert.match(styles, /data-composer-mode="shell"\] \.pi-web-chat-send[\s\S]*var\(--warning, #facc15\)/);
});

test("legacy composer shell mode disables attach and restores normal mode", async () => {
  await withWindow(async ({ window }) => {
    const dom = createChatDom();
    window.document.body.append(dom.root);

    setComposerMode(dom, "shell");

    assert.equal(dom.root.dataset.composerMode, "shell");
    assert.equal(dom.attachButton.disabled, true);
    assert.equal(dom.attachButton.title, "shell command mode");
    assert.notEqual(dom.attachButton.querySelector("[data-material-icon='terminal']"), null);

    setComposerMode(dom, "normal");

    assert.equal(dom.root.dataset.composerMode, "normal");
    assert.equal(dom.attachButton.disabled, false);
    assert.equal(dom.attachButton.title, "attach files");
    assert.notEqual(dom.attachButton.querySelector("[data-material-icon='attach_file']"), null);
  });
});

test("legacy chat renderer remains exported", async () => {
  await withWindow(async ({ window }) => {
    const container = window.document.createElement("div");
    renderMessages(container, [{ id: "m1", role: "assistant", text: "hello", createdAt: 1 }]);
    assert.match(container.textContent, /hello/);
  });
});

test("channels use pi-web standard names", () => {
  const pi = createPiWeb();
  const channels = createChannels(pi);
  channels.input$.next("hello");
  assert.equal(channels.input$.getValue(), "hello");
  assert.deepEqual(pi.listSubjects().sort(), ["chat.input", "chat.input.submitted", "plugin.pi-web-sidebar.selectedSession", "session.activeId", "toast.requested"].sort());
});

test("active workspace prefers sidebar then dataset", () => {
  assert.equal(getActiveWorkspaceId({ app: { dataset: { activeWorkspaceId: "dataset" } } }), "dataset");
  assert.equal(
    getActiveWorkspaceId({
      app: { dataset: { activeWorkspaceId: "dataset" }, piWebSidebar: { getSnapshot: () => ({ activeWorkspaceId: "sidebar" }) } },
    }),
    "sidebar",
  );
});

test("backendCall wraps workspaceId and data", async () => {
  const calls = [];
  const response = await backendCall(
    {
      app: { dataset: { activeWorkspaceId: "workspace-1" } },
      backend: async (method, input) => {
        calls.push({ method, input });
        return { ok: true };
      },
    },
    "commands",
    { limit: 1 },
  );

  assert.deepEqual(response, { ok: true });
  assert.deepEqual(calls, [{ method: "commands", input: { workspaceId: "workspace-1", data: { limit: 1 } } }]);
});

test("activate requires modern pi-web mount APIs", async () => {
  await withWindow(async ({ window }) => {
    assert.throws(
      () => activate({ app: window.document.querySelector("pi-app"), backend: async () => ({}) }),
      /requires modern pi-web mount\.chat and mount\.composer APIs/,
    );
  });
});

test("mounted composer ignores host runtime meta and uses plugin backend", async () => {
  await withWindow(async ({ window }) => {
    const app = window.document.querySelector("pi-app");
    const backendCalls = [];
    const originalSetInterval = window.setInterval;
    app.runtimeStatus = {
      model: "Host model",
      thinkingLevel: "xhigh",
      fiveHourQuota: 1,
      weeklyQuota: 2,
      currentBranch: "host-branch",
    };
    app.updatePromptMeta = () => {
      throw new Error("host updatePromptMeta must not be called");
    };
    app.loadRuntimeStatus = () => {
      throw new Error("host loadRuntimeStatus must not be called");
    };
    window.setInterval = () => {
      throw new Error("prompt meta must not poll");
    };
    app.piWebSidebar = {
      getSnapshot: () => ({
        activeWorkspaceId: "workspace-2",
        workspaces: [{ id: "workspace-2", path: "/tmp/runtime-workspace" }],
      }),
    };

    const cleanup = activate({
      app,
      backend: async (method, input) => {
        backendCalls.push({ method, input });

        return method === "runtimeStatus" ? {
          status: {
            model: "GPT-5.5",
            thinkingLevel: "high",
            fiveHourQuota: 84,
            weeklyQuota: 14,
            currentBranch: "feature/ui",
          },
        } : {};
      },
      mount: createMount(window, app),
    });
    await tick();
    await tick();

    assert.equal(
      window.document.querySelector("[data-prompt-meta]").textContent,
      "GPT-5.5 (high) | 5h (84%) | Week (14%) | feature/ui",
    );
    assert.notEqual(window.document.querySelector(".prompt-meta-battery-full svg"), null);
    assert.notEqual(window.document.querySelector(".prompt-meta-battery-low svg"), null);
    assert.notEqual(window.document.querySelector(".prompt-meta-branch svg"), null);
    assert.deepEqual(backendCalls[0], {
      method: "runtimeStatus",
      input: { workspaceId: "workspace-2", data: { workspacePath: "/tmp/runtime-workspace" } },
    });
    cleanup();
    window.setInterval = originalSetInterval;
  });
});

test("mounted composer loads prompt meta from plugin backend when host app is unavailable", async () => {
  await withWindow(async ({ window }) => {
    const app = window.document.querySelector("pi-app");
    const cleanup = activate({
      backend: async (method) => method === "runtimeStatus" ? {
        status: {
          model: "GPT-5.5",
          thinkingLevel: "high",
          fiveHourQuota: 84,
          weeklyQuota: 14,
          currentBranch: "feature/ui",
        },
      } : {},
      mount: createMount(window, app),
    });
    await tick();
    await tick();

    assert.equal(
      window.document.querySelector("[data-prompt-meta]").textContent,
      "GPT-5.5 (high) | 5h (84%) | Week (14%) | feature/ui",
    );

    cleanup();
  });
});

test("mounted chatState preserves messages while sanitizing malformed tool calls", async () => {
  await withWindow(async ({ window }) => {
    const app = window.document.querySelector("pi-app");
    app.piWebSidebar = { getSnapshot: () => ({ activeSessionId: "malformed-session" }) };
    const cleanup = activate({
      app,
      backend: async (method, input) => {
        if (method === "chatState") {
          const second = input.data.sessionId === "malformed-session-2";
          return {
            activeSessionId: input.data.sessionId || "malformed-session",
            messages: [{
              id: second ? "bad-2" : "bad-1",
              role: "assistant",
              text: second ? "message survives 2" : "message survives 1",
              createdAt: second ? 2 : 1,
              toolCalls: second
                ? [
                  { id: "ok", name: "read", text: "safe", status: "ok" },
                  { id: "bad", name: 42, text: "bad", status: "ok" },
                ]
                : { id: "bad", name: "read", text: "bad", status: "ok" },
            }],
          };
        }

        return {};
      },
      mount: createMount(window, app),
    });

    await tick();
    await tick();

    assert.match(window.document.querySelector(".term-inner").textContent, /message survives 1/);
    assert.equal(window.document.querySelectorAll(".tool-card").length, 0);

    window.document.querySelector("pi-app").piWebSidebar.getSnapshot = () => ({ activeSessionId: "malformed-session-2" });
    globalThis.piWeb.behaviorSubject("session.activeId", null).next("malformed-session-2");
    await tick();
    await tick();

    assert.match(window.document.querySelector(".term-inner").textContent, /message survives 2/);
    assert.equal(window.document.querySelectorAll(".tool-card").length, 1);
    assert.equal(window.document.querySelector(".tool-card").dataset.tool, "read");
    cleanup();
  });
});

test("mounted activation shows guide when no selected or stored session exists", async () => {
  await withWindow(async ({ window, backendCalls }) => {
    const app = window.document.querySelector("pi-app");

    const cleanup = activate({
      app,
      backend: async (method, input) => {
        backendCalls.push({ method, input });
        return {};
      },
      mount: createMount(window, app),
    });

    await tick();
    await tick();

    assert.match(window.document.querySelector(".term-inner").textContent, /pi-web-chat guide/);
    assert.match(window.document.querySelector(".term-inner").textContent, /Select or create a session/);
    assert.equal(backendCalls.some((call) => call.method === "chatState"), false);
    cleanup();
  });
});

test("mounted activation ignores stored sessions when no sidebar session is selected", async () => {
  await withWindow(async ({ window, backendCalls }) => {
    const app = window.document.querySelector("pi-app");
    window.localStorage.setItem("plugin.pi-web-sidebar.activeSessionId", "stale-sidebar-session");
    window.localStorage.setItem("pi-web-chat.sessions.v1", JSON.stringify({
      activeSessionId: "stored-session",
      sessions: [{
        id: "stored-session",
        title: "Stored",
        createdAt: 1,
        updatedAt: 1,
        messages: [{ id: "m1", role: "assistant", text: "stored transcript", createdAt: 1 }],
      }],
    }));

    const cleanup = activate({
      app,
      backend: async (method, input) => {
        backendCalls.push({ method, input });
        return {};
      },
      mount: createMount(window, app),
    });

    await tick();
    await tick();

    const text = window.document.querySelector(".term-inner").textContent;
    assert.match(text, /pi-web-chat guide/);
    assert.doesNotMatch(text, /stored transcript/);
    assert.equal(backendCalls.some((call) => call.method === "chatState"), false);
    cleanup();
  });
});

test("mounted activation does not persist a temp session before selection or submit", async () => {
  await withWindow(async ({ window }) => {
    const app = window.document.querySelector("pi-app");
    window.localStorage.setItem("pi-web-chat.sessions.v1", JSON.stringify({
      activeSessionId: "stored-session",
      sessions: [{
        id: "stored-session",
        title: "Stored",
        createdAt: 1,
        updatedAt: 1,
        messages: [{ id: "m1", role: "assistant", text: "stored transcript", createdAt: 1 }],
      }],
    }));

    const cleanup = activate({
      app,
      backend: async () => ({}),
      mount: createMount(window, app),
    });

    await tick();
    await tick();

    const store = JSON.parse(window.localStorage.getItem("pi-web-chat.sessions.v1"));
    assert.equal(store.activeSessionId, "stored-session");
    assert.deepEqual(store.sessions.map((session) => session.id), ["stored-session"]);
    cleanup();
  });
});

test("mounted submit without selected session preserves cached sessions and prunes temp session", async () => {
  await withWindow(async ({ window }) => {
    const app = window.document.querySelector("pi-app");
    window.localStorage.setItem("pi-web-chat.sessions.v1", JSON.stringify({
      activeSessionId: "stored-session",
      sessions: [{
        id: "stored-session",
        title: "Stored",
        createdAt: 1,
        updatedAt: 1,
        messages: [{ id: "m1", role: "assistant", text: "stored transcript", createdAt: 1 }],
      }],
    }));

    const cleanup = activate({
      app,
      backend: async (method, input) => {
        if (method === "startPrompt") {
          return { activeSessionId: "new-session" };
        }

        if (method === "submitPrompt") {
          return { activeSessionId: "new-session", messages: [{ id: "u1", role: "user", text: input.data.text, createdAt: 1 }] };
        }

        return {};
      },
      mount: createMount(window, app),
    });

    await tick();
    const textarea = window.document.querySelector(".prompt-textarea");
    textarea.value = "start from guide";
    textarea.dispatchEvent(new window.Event("input", { bubbles: true }));
    window.document.querySelector(".send-btn").click();
    await tick();
    await tick();

    const store = JSON.parse(window.localStorage.getItem("pi-web-chat.sessions.v1"));
    assert.equal(store.activeSessionId, "new-session");
    assert.ok(store.sessions.some((session) => session.id === "stored-session"));
    assert.ok(store.sessions.some((session) => session.id === "new-session"));
    assert.equal(store.sessions.filter((session) => session.title === "New chat" && session.messages.length === 0).length, 0);
    cleanup();
  });
});

test("mounted activation shows guide for empty stored session", async () => {
  await withWindow(async ({ window }) => {
    const app = window.document.querySelector("pi-app");
    window.localStorage.setItem("pi-web-chat.sessions.v1", JSON.stringify({
      activeSessionId: "empty-stored-session",
      sessions: [{
        id: "empty-stored-session",
        title: "Empty",
        createdAt: 1,
        updatedAt: 1,
        messages: [],
      }],
    }));

    const cleanup = activate({
      app,
      backend: async () => ({}),
      mount: createMount(window, app),
    });

    await tick();
    await tick();

    assert.match(window.document.querySelector(".term-inner").textContent, /pi-web-chat guide/);
    assert.match(window.document.querySelector(".term-inner").textContent, /Select or create a session/);
    cleanup();
  });
});

test("mounted activation shows guide for empty selected session", async () => {
  await withWindow(async ({ window }) => {
    const app = window.document.querySelector("pi-app");
    app.piWebSidebar = { getSnapshot: () => ({ activeSessionId: "empty-selected-session" }) };

    const cleanup = activate({
      app,
      backend: async () => ({ activeSessionId: "empty-selected-session", messages: [] }),
      mount: createMount(window, app),
    });

    await tick();
    await tick();

    assert.match(window.document.querySelector(".term-inner").textContent, /pi-web-chat guide/);
    assert.match(window.document.querySelector(".term-inner").textContent, /Select or create a session/);
    cleanup();
  });
});

test("mounted activation loads sidebar-selected session and sends chatState for it", async () => {
  await withWindow(async ({ window, backendCalls }) => {
    const app = window.document.querySelector("pi-app");
    app.piWebSidebar = { getSnapshot: () => ({ activeSessionId: "sidebar-session", activeWorkspaceId: "workspace-2" }) };

    const cleanup = activate({
      app,
      backend: async (method, input) => {
        backendCalls.push({ method, input });

        if (method === "chatState") {
          return { activeSessionId: "sidebar-session", messages: [{ id: "m1", role: "assistant", text: "selected transcript", createdAt: 1 }] };
        }

        return {};
      },
      mount: createMount(window, app),
    });

    await tick();
    await tick();

    const store = JSON.parse(window.localStorage.getItem("pi-web-chat.sessions.v1"));
    assert.equal(store.activeSessionId, "sidebar-session");
    assert.equal(app.dataset.activeWorkspaceId, "workspace-2");
    assert.match(window.document.querySelector(".term-inner").textContent, /selected transcript/);
    assert.ok(backendCalls.some((call) => call.method === "chatState" && call.input.data.sessionId === "sidebar-session"));
    cleanup();
  });
});

test("mounted chat starts at bottom and scroll-bottom button controls pinned scrolling", async () => {
  await withWindow(async ({ window }) => {
    const app = window.document.querySelector("pi-app");
    let selectedSession = "initial-scroll-session";
    app.piWebSidebar = {
      getSnapshot: () => ({ activeSessionId: selectedSession, activeWorkspaceId: "workspace-2" }),
    };

    const cleanup = activate({
      app,
      backend: async (method, input) => {
        if (method === "chatState") {
          return {
            activeSessionId: input.data.sessionId || selectedSession,
            messages: [{
              id: input.data.sessionId || selectedSession,
              role: "assistant",
              text: `transcript ${input.data.sessionId || selectedSession}`,
              createdAt: 1,
            }],
          };
        }

        return {};
      },
      mount: createMount(window, app),
    });

    const term = window.document.querySelector(".term");
    const button = window.document.querySelector(".scroll-bottom-btn");
    Object.defineProperty(term, "scrollHeight", { configurable: true, value: 900 });

    await tick();
    await tick();

    assert.equal(term.scrollTop, 900);
    assert.equal(button.hidden, false);
    assert.equal(button.getAttribute("aria-pressed"), "true");

    term.scrollTop = 100;
    term.dispatchEvent(new window.WheelEvent("wheel", { deltaY: -20, bubbles: true }));
    assert.equal(button.getAttribute("aria-pressed"), "false");

    selectedSession = "released-scroll-session";
    globalThis.piWeb.behaviorSubject("plugin.pi-web-sidebar.selectedSession", null)
      .next({ sessionId: selectedSession, workspaceId: "workspace-2" });
    await tick();
    await tick();
    assert.equal(term.scrollTop, 100);

    button.click();
    assert.equal(term.scrollTop, 900);
    assert.equal(button.getAttribute("aria-pressed"), "true");

    const touchStart = new window.Event("touchstart", { bubbles: true });
    Object.defineProperty(touchStart, "touches", { value: { item: () => ({ clientY: 10 }) } });
    term.dispatchEvent(touchStart);
    const touchMove = new window.Event("touchmove", { bubbles: true });
    Object.defineProperty(touchMove, "touches", { value: { item: () => ({ clientY: 30 }) } });
    term.dispatchEvent(touchMove);
    assert.equal(button.getAttribute("aria-pressed"), "false");

    button.click();
    selectedSession = "pinned-scroll-session";
    globalThis.piWeb.behaviorSubject("plugin.pi-web-sidebar.selectedSession", null)
      .next({ sessionId: selectedSession, workspaceId: "workspace-2" });
    await tick();
    await tick();
    assert.equal(term.scrollTop, 900);
    cleanup();
  });
});

test("mounted activation uses session SSE when available", async () => {
  await withWindow(async ({ window, backendCalls }) => {
    const app = window.document.querySelector("pi-app");
    const encoder = new TextEncoder();
    app.piWebSidebar = { getSnapshot: () => ({ activeSessionId: "sse-session", activeWorkspaceId: "workspace-2" }) };

    const cleanup = activate({
      app,
      backend: async (method, input) => {
        backendCalls.push({ method, input });
        return {};
      },
      backendStream: async (method, input) => {
        backendCalls.push({ method, input });

        if (method === "sessionEventsSse") {
          return new ReadableStream({
            start(controller) {
              controller.enqueue(encoder.encode('event: chat.state\ndata: {"type":"chat.state","activeSessionId":"sse-session","messages":[{"id":"m1","role":"assistant","text":"session sse transcript","createdAt":1}]}\n\n'));
              controller.close();
            },
          });
        }

        return {};
      },
      mount: createMount(window, app),
    });

    await tick();
    await tick();

    assert.ok(backendCalls.some((call) => call.method === "sessionEventsSse" && call.input.data.sessionId === "sse-session"));
    assert.equal(backendCalls.some((call) => call.method === "chatState"), false);
    assert.match(window.document.querySelector(".term-inner").textContent, /session sse transcript/);
    cleanup();
  });
});

test("mounted reactivation aborts previous session SSE", async () => {
  await withWindow(async ({ window }) => {
    const app = window.document.querySelector("pi-app");
    const aborts = [];
    app.piWebSidebar = { getSnapshot: () => ({ activeSessionId: "reactivate-session", activeWorkspaceId: "workspace-2" }) };
    const context = {
      app,
      backend: async () => ({}),
      backendStream: async (method, input, options) => {
        if (method === "sessionEventsSse") {
          options?.signal?.addEventListener("abort", () => aborts.push(input.data.sessionId || ""));
          return new ReadableStream({ start() {} });
        }

        return {};
      },
      mount: createMount(window, app),
    };

    const cleanup = activate(context);
    await tick();
    activate(context);
    await tick();

    assert.ok(aborts.includes("reactivate-session"));
    app.piWebChat.dispose();
  });
});

test("mounted activation follows sidebar selected-session channel after mount", async () => {
  await withWindow(async ({ window }) => {
    const app = window.document.querySelector("pi-app");
    const selectedSession$ = new BehaviorSubject(null);
    app.piWebSidebar = { channels: { selectedSession$ }, getSnapshot: () => ({ activeWorkspaceId: "workspace-1" }) };

    const cleanup = activate({
      app,
      backend: async (method, input) => {
        if (method === "chatState" && input.data.sessionId === "later-session") {
          return { activeSessionId: "later-session", messages: [{ id: "m1", role: "assistant", text: "later transcript", createdAt: 1 }] };
        }

        return {};
      },
      mount: createMount(window, app),
    });

    selectedSession$.next({ sessionId: "later-session", workspaceId: "workspace-3" });
    await tick();
    await tick();

    const store = JSON.parse(window.localStorage.getItem("pi-web-chat.sessions.v1"));
    assert.equal(store.activeSessionId, "later-session");
    assert.equal(app.dataset.activeWorkspaceId, "workspace-3");
    assert.match(window.document.querySelector(".term-inner").textContent, /later transcript/);
    cleanup();
  });
});

test("mounted activation ignores duplicate sidebar selection events", async () => {
  await withWindow(async ({ window }) => {
    const app = window.document.querySelector("pi-app");
    const selectedSession$ = new BehaviorSubject(null);
    let sessionStreamCount = 0;
    app.dataset.activeWorkspaceId = "workspace-dup";
    app.piWebSidebar = {
      channels: { selectedSession$ },
      getSnapshot: () => ({
        activeWorkspaceId: "workspace-dup",
        activeSessionId: "dup-session",
        workspaces: [{ id: "workspace-dup", path: "/tmp/workspace-dup" }],
      }),
    };

    const cleanup = activate({
      app,
      backend: async () => ({}),
      backendStream: async (method) => {
        if (method === "sessionEventsSse") {
          sessionStreamCount += 1;
          return new ReadableStream({ start() {} });
        }

        return {};
      },
      mount: createMount(window, app),
    });

    await tick();
    const initialStreamCount = sessionStreamCount;
    selectedSession$.next({ sessionId: "dup-session", workspaceId: "workspace-dup" });
    selectedSession$.next({ sessionId: "dup-session", workspaceId: "workspace-dup" });
    await tick();

    assert.equal(sessionStreamCount, initialStreamCount);
    cleanup();
  });
});

test("mounted activation shows guide when viewed sidebar session is deleted", async () => {
  await withWindow(async ({ window }) => {
    const app = window.document.querySelector("pi-app");
    const events$ = new Subject();
    app.piWebSidebar = {
      channels: { events$ },
      getSnapshot: () => ({ activeSessionId: "delete-me", activeWorkspaceId: "workspace-1" }),
    };

    const cleanup = activate({
      app,
      backend: async (method, input) => {
        if (method === "chatState" && input.data.sessionId === "delete-me") {
          return { activeSessionId: "delete-me", messages: [{ id: "m1", role: "assistant", text: "delete transcript", createdAt: 1 }] };
        }

        return {};
      },
      mount: createMount(window, app),
    });

    await tick();
    await tick();
    assert.match(window.document.querySelector(".term-inner").textContent, /delete transcript/);

    events$.next({ type: "session.deleted", detail: { sessionId: "delete-me", workspaceId: "workspace-1" } });
    await tick();

    const store = JSON.parse(window.localStorage.getItem("pi-web-chat.sessions.v1"));
    assert.equal(store.activeSessionId, "");
    assert.equal(store.sessions.some((session) => session.id === "delete-me"), false);
    assert.equal(window.localStorage.getItem("plugin.pi-web-sidebar.activeSessionId"), null);
    assert.match(window.document.querySelector(".term-inner").textContent, /pi-web-chat guide/);
    cleanup();
  });
});

test("mounted activation renders next sidebar session when deleted event already selected it", async () => {
  await withWindow(async ({ window }) => {
    const app = window.document.querySelector("pi-app");
    const events$ = new Subject();
    const encoder = new TextEncoder();
    const sessionStreams = [];
    app.piWebSidebar = {
      channels: { events$ },
      getSnapshot: () => ({ activeSessionId: "delete-me", activeWorkspaceId: "workspace-1" }),
    };

    const cleanup = activate({
      app,
      backend: async () => ({}),
      backendStream: async (method, input) => {
        if (method === "sessionEventsSse") {
          sessionStreams.push(input.data.sessionId);
          const sessionId = input.data.sessionId;
          const text = sessionId === "next-session" ? "next transcript" : "delete transcript";
          const payload = JSON.stringify({
            type: "chat.state",
            activeSessionId: sessionId,
            messages: [{ id: sessionId, role: "assistant", text, createdAt: 1 }],
          });

          return new ReadableStream({
            start(controller) {
              controller.enqueue(encoder.encode(`data: ${payload}\n\n`));
              controller.close();
            },
          });
        }

        return {};
      },
      mount: createMount(window, app),
    });

    await tick();
    await tick();
    events$.next({
      type: "session.deleted",
      detail: { sessionId: "delete-me", workspaceId: "workspace-1" },
      snapshot: { activeSessionId: "next-session", activeWorkspaceId: "workspace-1" },
    });
    assert.doesNotMatch(window.document.querySelector(".term-inner").textContent, /pi-web-chat guide/);
    await tick();
    await tick();

    const store = JSON.parse(window.localStorage.getItem("pi-web-chat.sessions.v1"));
    assert.equal(store.activeSessionId, "next-session");
    assert.equal(store.sessions.some((session) => session.id === "delete-me"), false);
    assert.deepEqual(sessionStreams, ["delete-me", "next-session"]);
    assert.match(window.document.querySelector(".term-inner").textContent, /next transcript/);
    assert.doesNotMatch(window.document.querySelector(".term-inner").textContent, /pi-web-chat guide/);
    cleanup();
  });
});

test("mounted activation keeps current view when another sidebar session is deleted", async () => {
  await withWindow(async ({ window }) => {
    const app = window.document.querySelector("pi-app");
    const events$ = new Subject();
    app.piWebSidebar = {
      channels: { events$ },
      getSnapshot: () => ({ activeSessionId: "keep-me", activeWorkspaceId: "workspace-1" }),
    };

    window.localStorage.setItem("pi-web-chat.sessions.v1", JSON.stringify({
      activeSessionId: "keep-me",
      sessions: [
        { id: "keep-me", title: "Keep", createdAt: 1, updatedAt: 2, messages: [] },
        { id: "delete-other", title: "Other", createdAt: 1, updatedAt: 1, messages: [] },
      ],
    }));

    const cleanup = activate({
      app,
      backend: async (method, input) => {
        if (method === "chatState" && input.data.sessionId === "keep-me") {
          return { activeSessionId: "keep-me", messages: [{ id: "m1", role: "assistant", text: "keep transcript", createdAt: 1 }] };
        }

        return {};
      },
      mount: createMount(window, app),
    });

    await tick();
    await tick();
    events$.next({ type: "session.deleted", detail: { sessionId: "delete-other", workspaceId: "workspace-1" } });
    await tick();

    const store = JSON.parse(window.localStorage.getItem("pi-web-chat.sessions.v1"));
    assert.equal(store.activeSessionId, "keep-me");
    assert.equal(store.sessions.some((session) => session.id === "delete-other"), false);
    assert.match(window.document.querySelector(".term-inner").textContent, /keep transcript/);
    cleanup();
  });
});

test("mounted activation follows sidebar session.activeId clicks after mount", async () => {
  await withWindow(async ({ window, backendCalls }) => {
    const app = window.document.querySelector("pi-app");
    app.dataset.activeWorkspaceId = "workspace-clicked";
    app.piWebSidebar = {
      getSnapshot: () => ({
        activeWorkspaceId: "workspace-clicked",
        workspaces: [{ id: "workspace-clicked", path: "/tmp/workspace-clicked" }],
      }),
    };

    const cleanup = activate({
      app,
      backend: async (method, input) => {
        backendCalls.push({ method, input });

        if (method === "chatState" && input.data.sessionId === "clicked-session") {
          return { activeSessionId: "clicked-session", messages: [{ id: "m1", role: "assistant", text: "clicked transcript", createdAt: 1 }] };
        }

        return {};
      },
      mount: createMount(window, app),
    });

    globalThis.piWeb.behaviorSubject("session.activeId", null).next("clicked-session");
    await tick();
    await tick();

    const store = JSON.parse(window.localStorage.getItem("pi-web-chat.sessions.v1"));
    const clickedCall = backendCalls.find((call) => call.method === "chatState" && call.input.data.sessionId === "clicked-session");
    assert.equal(store.activeSessionId, "clicked-session");
    assert.equal(clickedCall.input.data.workspacePath, "/tmp/workspace-clicked");
    assert.equal(window.localStorage.getItem("plugin.pi-web-sidebar.activeWorkspaceId"), "workspace-clicked");
    assert.match(window.document.querySelector(".term-inner").textContent, /clicked transcript/);
    cleanup();
  });
});

test("mounted sidebar selection sends selected workspace path even when active snapshot is stale", async () => {
  await withWindow(async ({ window, backendCalls }) => {
    const app = window.document.querySelector("pi-app");
    app.dataset.activeWorkspaceId = "workspace-old";
    app.piWebSidebar = {
      getSnapshot: () => ({
        activeWorkspaceId: "workspace-old",
        workspaces: [
          { id: "workspace-old", path: "/tmp/workspace-old" },
          { id: "workspace-selected", path: "/tmp/workspace-selected" },
        ],
      }),
    };

    const cleanup = activate({
      app,
      backend: async (method, input) => {
        backendCalls.push({ method, input });

        if (method === "chatState" && input.data.sessionId === "selected-session") {
          return { activeSessionId: "selected-session", messages: [{ id: "m1", role: "assistant", text: "selected transcript", createdAt: 1 }] };
        }

        return {};
      },
      mount: createMount(window, app),
    });

    globalThis.piWeb.behaviorSubject("plugin.pi-web-sidebar.selectedSession", null)
      .next({ sessionId: "selected-session", workspaceId: "workspace-selected" });
    await tick();
    await tick();

    const selectedCall = backendCalls.find((call) => {
      return call.method === "chatState" && call.input.data.sessionId === "selected-session";
    });
    assert.equal(selectedCall.input.data.workspacePath, "/tmp/workspace-selected");
    assert.match(window.document.querySelector(".term-inner").textContent, /selected transcript/);
    cleanup();
  });
});

test("mounted activation ignores stale chatState after later sidebar click", async () => {
  await withWindow(async ({ window }) => {
    const app = window.document.querySelector("pi-app");
    let releaseInitial;
    const initialReady = new Promise((resolve) => { releaseInitial = resolve; });
    app.dataset.activeWorkspaceId = "workspace-clicked";
    app.piWebSidebar = {
      getSnapshot: () => ({
        activeWorkspaceId: "workspace-clicked",
        workspaces: [{ id: "workspace-clicked", path: "/tmp/workspace-clicked" }],
      }),
    };

    const cleanup = activate({
      app,
      backend: async (method, input) => {
        if (method === "chatState" && input.data.sessionId === "clicked-session") {
          return { activeSessionId: "clicked-session", messages: [{ id: "m1", role: "assistant", text: "clicked transcript", createdAt: 2 }] };
        }

        if (method === "chatState") {
          await initialReady;
          return { activeSessionId: "old-session", messages: [{ id: "old", role: "assistant", text: "old transcript", createdAt: 1 }] };
        }

        return {};
      },
      mount: createMount(window, app),
    });

    globalThis.piWeb.behaviorSubject("session.activeId", null).next("clicked-session");
    await tick();
    releaseInitial();
    await tick();
    await tick();

    const store = JSON.parse(window.localStorage.getItem("pi-web-chat.sessions.v1"));
    assert.equal(store.activeSessionId, "clicked-session");
    assert.match(window.document.querySelector(".term-inner").textContent, /clicked transcript/);
    assert.doesNotMatch(window.document.querySelector(".term-inner").textContent, /old transcript/);
    cleanup();
  });
});

test("mounted submit persists backend session and emits sidebar-compatible events", async () => {
  await withWindow(async ({ window }) => {
    const app = window.document.querySelector("pi-app");
    const events = [];
    app.piWebSidebar = {
      channels: { events$: new Subject() },
      getSnapshot: () => ({ activeWorkspaceId: "workspace-1", activeSessionId: app.dataset.activeSessionId }),
    };
    app.piWebSidebar.channels.events$.subscribe((event) => events.push(event));

    const piEvents = [];
    globalThis.piWeb.subject("plugin.pi-web-sidebar.event").subscribe((event) => piEvents.push(event));
    const sessionChanges = [];
    globalThis.piWeb.subject("session.changed").subscribe((event) => sessionChanges.push(event));

    const cleanup = activate({
      app,
      backend: async (method, input) => {
        if (method === "startPrompt") {
          return {};
        }

        if (method === "submitPrompt") {
          return { activeSessionId: "new-session", messages: [{ id: "u1", role: "user", text: input.data.text, createdAt: 1 }] };
        }

        return {};
      },
      mount: createMount(window, app),
    });

    const textarea = window.document.querySelector(".prompt-textarea");
    textarea.value = "send to pi";
    textarea.dispatchEvent(new window.Event("input", { bubbles: true }));
    window.document.querySelector(".send-btn").click();
    await tick();

    const store = JSON.parse(window.localStorage.getItem("pi-web-chat.sessions.v1"));
    assert.equal(store.activeSessionId, "new-session");
    assert.equal(window.localStorage.getItem("plugin.pi-web-sidebar.activeSessionId"), "new-session");
    assert.equal(app.dataset.activeSessionId, "new-session");
    assert.equal(events[0].type, "chat-session");
    assert.equal(piEvents[0].detail.sessionId, "new-session");
    assert.deepEqual(sessionChanges, [{ sessionId: "new-session", name: "send to pi", title: "send to pi" }]);
    cleanup();
  });
});

test("mounted submit clears the submitted prompt immediately", async () => {
  await withWindow(async ({ window }) => {
    const app = window.document.querySelector("pi-app");
    let releaseStart;
    const startReady = new Promise((resolve) => { releaseStart = resolve; });

    const cleanup = activate({
      app,
      backend: async (method, input) => {
        if (method === "startPrompt") {
          await startReady;
          return { activeSessionId: "clear-session", messages: [] };
        }

        if (method === "submitPrompt") {
          return { activeSessionId: input.data.sessionId, messages: [] };
        }

        return {};
      },
      mount: createMount(window, app),
    });

    const textarea = window.document.querySelector(".prompt-textarea");
    textarea.value = "  clear me  ";
    textarea.dispatchEvent(new window.Event("input", { bubbles: true }));
    window.document.querySelector(".send-btn").click();
    await tick();

    assert.equal(textarea.value, "");
    releaseStart();
    await tick();
    cleanup();
  });
});

test("mounted submit clears whitespace-only input", async () => {
  await withWindow(async ({ window }) => {
    const app = window.document.querySelector("pi-app");
    const cleanup = activate({ app, backend: async () => ({}), mount: createMount(window, app) });
    const textarea = window.document.querySelector(".prompt-textarea");
    textarea.value = "   ";
    textarea.dispatchEvent(new window.Event("input", { bubbles: true }));
    window.document.querySelector(".send-btn").click();
    await tick();

    assert.equal(textarea.value, "");
    cleanup();
  });
});

test("mounted submit deduplicates backend echo of current optimistic user prompt", async () => {
  await withWindow(async ({ window }) => {
    const app = window.document.querySelector("pi-app");

    const cleanup = activate({
      app,
      backend: async (method, input) => {
        if (method === "startPrompt") {
          return { activeSessionId: "dedupe-session" };
        }

        if (method === "submitPrompt") {
          return {
            activeSessionId: "dedupe-session",
            messages: [{ id: "backend-user", role: "user", text: input.data.text, createdAt: Date.now() }],
          };
        }

        return {};
      },
      mount: createMount(window, app),
    });

    const textarea = window.document.querySelector(".prompt-textarea");
    textarea.value = "same prompt";
    textarea.dispatchEvent(new window.Event("input", { bubbles: true }));
    window.document.querySelector(".send-btn").click();
    await tick();
    await tick();

    const store = JSON.parse(window.localStorage.getItem("pi-web-chat.sessions.v1"));
    const session = store.sessions.find((item) => item.id === "dedupe-session");
    const userMessages = session.messages.filter((message) => message.role === "user" && message.text === "same prompt");
    assert.equal(userMessages.length, 1);
    assert.equal(userMessages[0].id, "backend-user");
    cleanup();
  });
});

test("mounted submit deduplicates backend-created session echo", async () => {
  await withWindow(async ({ window }) => {
    const app = window.document.querySelector("pi-app");

    const cleanup = activate({
      app,
      backend: async (method, input) => {
        if (method === "startPrompt") {
          return {};
        }

        if (method === "submitPrompt") {
          return {
            activeSessionId: "backend-created-dedupe",
            messages: [{ id: "backend-created-user", role: "user", text: input.data.text, createdAt: Date.now() }],
          };
        }

        return {};
      },
      mount: createMount(window, app),
    });

    const textarea = window.document.querySelector(".prompt-textarea");
    textarea.value = "created echo";
    textarea.dispatchEvent(new window.Event("input", { bubbles: true }));
    window.document.querySelector(".send-btn").click();
    await tick();
    await tick();

    const text = window.document.querySelector(".term-inner").textContent;
    const store = JSON.parse(window.localStorage.getItem("pi-web-chat.sessions.v1"));
    const session = store.sessions.find((item) => item.id === "backend-created-dedupe");
    const userMessages = session.messages.filter((message) => message.role === "user" && message.text === "created echo");
    assert.equal(userMessages.length, 1);
    assert.equal(userMessages[0].id, "backend-created-user");
    assert.match(text, /created echo/);
    cleanup();
  });
});

test("mounted submit keeps repeated same-text prompt when backend returns existing message", async () => {
  await withWindow(async ({ window }) => {
    const app = window.document.querySelector("pi-app");
    let submitCount = 0;

    const cleanup = activate({
      app,
      backend: async (method, input) => {
        if (method === "startPrompt") {
          return { activeSessionId: "repeat-session" };
        }

        if (method === "submitPrompt") {
          submitCount += 1;
          return {
            activeSessionId: "repeat-session",
            messages: [{ id: "backend-user-1", role: "user", text: input.data.text, createdAt: 1 }],
          };
        }

        return {};
      },
      mount: createMount(window, app),
    });

    const textarea = window.document.querySelector(".prompt-textarea");
    textarea.value = "repeat prompt";
    textarea.dispatchEvent(new window.Event("input", { bubbles: true }));
    window.document.querySelector(".send-btn").click();
    await tick();
    await tick();

    textarea.value = "repeat prompt";
    textarea.dispatchEvent(new window.Event("input", { bubbles: true }));
    window.document.querySelector(".send-btn").click();
    await tick();
    await tick();

    const store = JSON.parse(window.localStorage.getItem("pi-web-chat.sessions.v1"));
    const session = store.sessions.find((item) => item.id === "repeat-session");
    const userMessages = session.messages.filter((message) => message.role === "user" && message.text === "repeat prompt");
    assert.equal(submitCount, 2);
    assert.equal(userMessages.length, 2);
    assert.ok(userMessages.some((message) => message.id === "backend-user-1"));
    cleanup();
  });
});

test("mounted submit deduplicates streaming chat state echo of current prompt", async () => {
  await withWindow(async ({ window }) => {
    const app = window.document.querySelector("pi-app");
    const encoder = new TextEncoder();
    const cleanup = activate({
      app,
      backend: async (method) => {
        if (method === "startPrompt") {
          return { activeSessionId: "stream-echo-session", runId: "stream-echo-run", isStreaming: true };
        }

        return {};
      },
      backendStream: async (method) => {
        if (method === "streamEventsSse") {
          return new ReadableStream({
            start(controller) {
              controller.enqueue(encoder.encode('event: run.end\ndata: {"type":"run.end"}\n\n'));
              controller.close();
            },
          });
        }

        if (method === "sessionEventsSse") {
          const placeholder = JSON.stringify({
            type: "chat.state",
            activeSessionId: "stream-echo-session",
            messages: [{ id: "assistant-placeholder", role: "assistant", text: "", createdAt: 0 }],
          });
          const echo = JSON.stringify({
            type: "chat.state",
            activeSessionId: "stream-echo-session",
            messages: [{ id: "backend-stream-user", role: "user", text: "stream echo", createdAt: 1 }],
          });

          return new ReadableStream({
            start(controller) {
              controller.enqueue(encoder.encode(`event: chat.state\ndata: ${placeholder}\n\n`));
              controller.enqueue(encoder.encode(`event: chat.state\ndata: ${echo}\n\n`));
              controller.close();
            },
          });
        }

        return {};
      },
      mount: createMount(window, app),
    });

    const textarea = window.document.querySelector(".prompt-textarea");
    textarea.value = "stream echo";
    textarea.dispatchEvent(new window.Event("input", { bubbles: true }));
    window.document.querySelector(".send-btn").click();
    await tick();
    await tick();
    await tick();

    const store = JSON.parse(window.localStorage.getItem("pi-web-chat.sessions.v1"));
    const session = store.sessions.find((item) => item.id === "stream-echo-session");
    const userMessages = session.messages.filter((message) => message.role === "user" && message.text === "stream echo");
    assert.equal(userMessages.length, 1);
    assert.equal(userMessages[0].id, "backend-stream-user");
    cleanup();
  });
});

test("mounted submit replaces streaming assistant with backend final assistant", async () => {
  await withWindow(async ({ window }) => {
    const app = window.document.querySelector("pi-app");
    const encoder = new TextEncoder();
    let runController;

    const cleanup = activate({
      app,
      backend: async (method) => {
        if (method === "startPrompt") {
          return { activeSessionId: "final-assistant-session", runId: "final-assistant-run", isStreaming: true };
        }

        return {};
      },
      backendStream: async (method) => {
        if (method === "streamEventsSse") {
          return new ReadableStream({
            start(controller) {
              runController = controller;
            },
          });
        }

        if (method === "sessionEventsSse") {
          const userOnlyState = JSON.stringify({
            type: "chat.state",
            activeSessionId: "final-assistant-session",
            messages: [
              { id: "previous-assistant", role: "assistant", text: "final answer was old", createdAt: 10 },
              { id: "backend-user", role: "user", text: "dedupe final", createdAt: 3000 },
            ],
          });
          const finalState = JSON.stringify({
            type: "chat.state",
            activeSessionId: "final-assistant-session",
            messages: [
              { id: "previous-assistant", role: "assistant", text: "final answer was old", createdAt: 10 },
              { id: "backend-user", role: "user", text: "dedupe final", createdAt: 3000 },
              { id: "backend-assistant", role: "assistant", text: "final answer completed", createdAt: 2000 },
            ],
          });

          return new ReadableStream({
            start(controller) {
              controller.enqueue(encoder.encode(`event: chat.state\ndata: ${userOnlyState}\n\n`));
              controller.enqueue(encoder.encode(`event: chat.state\ndata: ${finalState}\n\n`));
              controller.close();
            },
          });
        }

        return {};
      },
      mount: createMount(window, app),
    });

    const textarea = window.document.querySelector(".prompt-textarea");
    textarea.value = "dedupe final";
    textarea.dispatchEvent(new window.Event("input", { bubbles: true }));
    window.document.querySelector(".send-btn").click();
    await tick();

    runController.enqueue(encoder.encode('event: text.delta\ndata: {"type":"text.delta","delta":"final answer"}\n\n'));
    runController.enqueue(encoder.encode('event: run.end\ndata: {"type":"run.end"}\n\n'));
    runController.close();
    await tick(300);
    await tick();
    await tick();

    const store = JSON.parse(window.localStorage.getItem("pi-web-chat.sessions.v1"));
    const session = store.sessions.find((item) => item.id === "final-assistant-session");
    assert.deepEqual(session.messages.map((message) => `${message.role}:${message.id}`), [
      "assistant:previous-assistant",
      "user:backend-user",
      "assistant:backend-assistant",
    ]);
    assert.deepEqual([...window.document.querySelectorAll(".transcript-item")].map((item) => item.textContent), [
      "pi >final answer was old",
      "you >dedupe final",
      "pi >final answer completed",
    ]);
    cleanup();
  });
});

test("mounted submit replaces streaming assistant from one final backend state", async () => {
  await withWindow(async ({ window }) => {
    const app = window.document.querySelector("pi-app");
    const encoder = new TextEncoder();
    let runController;

    const cleanup = activate({
      app,
      backend: async (method) => {
        if (method === "startPrompt") {
          return { activeSessionId: "one-shot-session", runId: "one-shot-run", isStreaming: true };
        }

        return {};
      },
      backendStream: async (method) => {
        if (method === "streamEventsSse") {
          return new ReadableStream({
            start(controller) {
              runController = controller;
            },
          });
        }

        if (method === "sessionEventsSse") {
          const state = JSON.stringify({
            type: "chat.state",
            activeSessionId: "one-shot-session",
            messages: [
              { id: "backend-user", role: "user", text: "one shot", createdAt: 3000 },
              { id: "backend-assistant", role: "assistant", text: "one final", createdAt: 2000 },
            ],
          });

          return new ReadableStream({
            start(controller) {
              controller.enqueue(encoder.encode(`event: chat.state\ndata: ${state}\n\n`));
              controller.close();
            },
          });
        }

        return {};
      },
      mount: createMount(window, app),
    });

    const textarea = window.document.querySelector(".prompt-textarea");
    textarea.value = "one shot";
    textarea.dispatchEvent(new window.Event("input", { bubbles: true }));
    window.document.querySelector(".send-btn").click();
    await tick();

    runController.enqueue(encoder.encode('event: text.delta\ndata: {"type":"text.delta","delta":"one partial"}\n\n'));
    runController.enqueue(encoder.encode('event: run.end\ndata: {"type":"run.end"}\n\n'));
    runController.close();
    await tick(300);
    await tick();
    await tick();

    const store = JSON.parse(window.localStorage.getItem("pi-web-chat.sessions.v1"));
    const session = store.sessions.find((item) => item.id === "one-shot-session");
    assert.deepEqual(session.messages.map((message) => `${message.role}:${message.id}`), [
      "user:backend-user",
      "assistant:backend-assistant",
    ]);
    cleanup();
  });
});

test("mounted submit keeps pending user before assistant-only backend state", async () => {
  await withWindow(async ({ window }) => {
    const app = window.document.querySelector("pi-app");
    const encoder = new TextEncoder();
    let runController;

    const cleanup = activate({
      app,
      backend: async (method) => {
        if (method === "startPrompt") {
          return { activeSessionId: "assistant-only-session", runId: "assistant-only-run", isStreaming: true };
        }

        return {};
      },
      backendStream: async (method) => {
        if (method === "streamEventsSse") {
          return new ReadableStream({
            start(controller) {
              runController = controller;
            },
          });
        }

        if (method === "sessionEventsSse") {
          const state = JSON.stringify({
            type: "chat.state",
            activeSessionId: "assistant-only-session",
            runId: "assistant-only-run",
            messages: [{
              id: "backend-assistant",
              role: "assistant",
              text: "assistant only final",
              createdAt: Date.now() + 1_000,
            }],
          });

          return new ReadableStream({
            start(controller) {
              controller.enqueue(encoder.encode(`event: chat.state\ndata: ${state}\n\n`));
              controller.close();
            },
          });
        }

        return {};
      },
      mount: createMount(window, app),
    });

    const textarea = window.document.querySelector(".prompt-textarea");
    textarea.value = "assistant only prompt";
    textarea.dispatchEvent(new window.Event("input", { bubbles: true }));
    window.document.querySelector(".send-btn").click();
    await tick();

    runController.enqueue(encoder.encode('event: text.delta\ndata: {"type":"text.delta","delta":"partial"}\n\n'));
    runController.enqueue(encoder.encode('event: run.end\ndata: {"type":"run.end"}\n\n'));
    runController.close();
    await tick(300);
    await tick();
    await tick();

    assert.deepEqual([...window.document.querySelectorAll(".transcript-item")].map((item) => item.textContent), [
      "you >assistant only prompt",
      "pi >assistant only final",
    ]);
    cleanup();
  });
});

test("mounted submit keeps all current assistant-only backend messages after pending user", async () => {
  await withWindow(async ({ window }) => {
    const app = window.document.querySelector("pi-app");
    const encoder = new TextEncoder();
    let runController;
    let startCount = 0;
    let steerCount = 0;

    const cleanup = activate({
      app,
      backend: async (method) => {
        if (method === "startPrompt") {
          startCount += 1;
          return {
            activeSessionId: "assistant-only-multi-session",
            runId: `assistant-only-multi-run-${startCount}`,
            isStreaming: true,
          };
        }

        if (method === "steerPrompt") {
          steerCount += 1;
          return { accepted: true };
        }

        return {};
      },
      backendStream: async (method) => {
        if (method === "streamEventsSse") {
          return new ReadableStream({
            start(controller) {
              runController = controller;
            },
          });
        }

        if (method === "sessionEventsSse") {
          const state = JSON.stringify({
            type: "chat.state",
            activeSessionId: "assistant-only-multi-session",
            runId: "assistant-only-multi-run-1",
            isStreaming: true,
            messages: [
              {
                id: "backend-assistant-1",
                role: "assistant",
                text: "assistant current one",
                createdAt: Date.now() + 1_000,
              },
              {
                id: "backend-assistant-2",
                role: "assistant",
                text: "assistant current two",
                createdAt: Date.now() + 2_000,
              },
            ],
          });

          return new ReadableStream({
            start(controller) {
              controller.enqueue(encoder.encode(`event: chat.state\ndata: ${state}\n\n`));
              controller.close();
            },
          });
        }

        return {};
      },
      mount: createMount(window, app),
    });

    const textarea = window.document.querySelector(".prompt-textarea");
    textarea.value = "assistant only multi prompt";
    textarea.dispatchEvent(new window.Event("input", { bubbles: true }));
    window.document.querySelector(".send-btn").click();
    await tick();

    runController.enqueue(encoder.encode('event: text.delta\ndata: {"type":"text.delta","delta":"partial"}\n\n'));
    runController.enqueue(encoder.encode('event: run.end\ndata: {"type":"run.end"}\n\n'));
    runController.close();
    await tick(300);
    await tick();
    await tick();

    assert.deepEqual([...window.document.querySelectorAll(".transcript-item")].map((item) => item.textContent), [
      "you >assistant only multi prompt",
      "pi >assistant current one",
      "pi >assistant current two",
    ]);

    textarea.value = "second normal prompt";
    textarea.dispatchEvent(new window.Event("input", { bubbles: true }));
    window.document.querySelector(".send-btn").click();
    await tick();

    assert.equal(startCount, 2);
    assert.equal(steerCount, 0);
    cleanup();
  });
});

test("mounted submit does not bind stale assistant-only history to pending prompt", async () => {
  await withWindow(async ({ window }) => {
    const app = window.document.querySelector("pi-app");
    const encoder = new TextEncoder();
    let runController;

    const cleanup = activate({
      app,
      backend: async (method) => {
        if (method === "startPrompt") {
          return { activeSessionId: "stale-assistant-session", runId: "stale-assistant-run", isStreaming: true };
        }

        return {};
      },
      backendStream: async (method) => {
        if (method === "streamEventsSse") {
          return new ReadableStream({
            start(controller) {
              runController = controller;
            },
          });
        }

        if (method === "sessionEventsSse") {
          const state = JSON.stringify({
            type: "chat.state",
            activeSessionId: "stale-assistant-session",
            messages: [{ id: "stale-assistant", role: "assistant", text: "stale answer", createdAt: 1 }],
          });

          return new ReadableStream({
            start(controller) {
              controller.enqueue(encoder.encode(`event: chat.state\ndata: ${state}\n\n`));
              controller.close();
            },
          });
        }

        return {};
      },
      mount: createMount(window, app),
    });

    const textarea = window.document.querySelector(".prompt-textarea");
    textarea.value = "fresh prompt";
    textarea.dispatchEvent(new window.Event("input", { bubbles: true }));
    window.document.querySelector(".send-btn").click();
    await tick();

    runController.enqueue(encoder.encode('event: text.delta\ndata: {"type":"text.delta","delta":"fresh partial"}\n\n'));
    runController.enqueue(encoder.encode('event: run.end\ndata: {"type":"run.end"}\n\n'));
    runController.close();
    await tick(300);
    await tick();
    await tick();

    assert.deepEqual([...window.document.querySelectorAll(".transcript-item")].map((item) => item.textContent), [
      "pi >stale answer",
      "you >fresh prompt",
      "pi >fresh partial",
    ]);
    cleanup();
  });
});

test("mounted submit does not bind previous assistant history to pending prompt", async () => {
  await withWindow(async ({ window }) => {
    const app = window.document.querySelector("pi-app");
    const encoder = new TextEncoder();
    let runController;

    const cleanup = activate({
      app,
      backend: async (method) => {
        if (method === "startPrompt") {
          return { activeSessionId: "assistant-history-session", runId: "assistant-history-run", isStreaming: true };
        }

        return {};
      },
      backendStream: async (method) => {
        if (method === "streamEventsSse") {
          return new ReadableStream({
            start(controller) {
              runController = controller;
            },
          });
        }

        if (method === "sessionEventsSse") {
          const state = JSON.stringify({
            type: "chat.state",
            activeSessionId: "assistant-history-session",
            messages: [
              { id: "old-assistant", role: "assistant", text: "old answer", createdAt: 1 },
              { id: "backend-user", role: "user", text: "history prompt", createdAt: 2 },
            ],
          });

          return new ReadableStream({
            start(controller) {
              controller.enqueue(encoder.encode(`event: chat.state\ndata: ${state}\n\n`));
              controller.close();
            },
          });
        }

        return {};
      },
      mount: createMount(window, app),
    });

    const textarea = window.document.querySelector(".prompt-textarea");
    textarea.value = "history prompt";
    textarea.dispatchEvent(new window.Event("input", { bubbles: true }));
    window.document.querySelector(".send-btn").click();
    await tick();

    runController.enqueue(encoder.encode('event: text.delta\ndata: {"type":"text.delta","delta":"current partial"}\n\n'));
    runController.enqueue(encoder.encode('event: run.end\ndata: {"type":"run.end"}\n\n'));
    runController.close();
    await tick(300);
    await tick();
    await tick();

    assert.deepEqual([...window.document.querySelectorAll(".transcript-item")].map((item) => item.textContent), [
      "pi >old answer",
      "you >history prompt",
      "pi >current partial",
    ]);
    cleanup();
  });
});

test("mounted submit preserves draft during async context resolution before run starts", async () => {
  await withWindow(async ({ window }) => {
    const app = window.document.querySelector("pi-app");
    const backendCalls = [];
    let releaseResolveContext;

    const cleanup = activate({
      app,
      backend: async (method, input) => {
        backendCalls.push({ method, input });

        if (method === "resolveContext") {
          await new Promise((resolve) => {
            releaseResolveContext = resolve;
          });
          return { attachments: [] };
        }

        if (method === "startPrompt") {
          return { activeSessionId: input.data.sessionId, runId: "active-run", isStreaming: true };
        }

        return {};
      },
      backendStream: async () => new ReadableStream({ start() {} }),
      mount: createMount(window, app),
    });

    const textarea = window.document.querySelector(".prompt-textarea");
    textarea.value = "first @README.md";
    textarea.dispatchEvent(new window.Event("input", { bubbles: true }));
    window.document.querySelector(".send-btn").click();
    await tick();

    textarea.value = "second";
    textarea.dispatchEvent(new window.Event("input", { bubbles: true }));
    window.document.querySelector(".send-btn").click();
    await tick();

    assert.equal(textarea.value, "second");
    releaseResolveContext();
    await tick();
    await tick();

    assert.equal(backendCalls.filter((call) => call.method === "startPrompt").length, 1);
    assert.equal(backendCalls.find((call) => call.method === "startPrompt").input.data.text, "first @README.md");
    assert.equal(textarea.value, "second");
    cleanup();
  });
});

test("mounted submit rejects steering without starting a competing run when backend lacks steerPrompt", async () => {
  await withWindow(async ({ window }) => {
    const app = window.document.querySelector("pi-app");
    const backendCalls = [];
    let firstStreamController;

    const cleanup = activate({
      app,
      backend: async (method, input) => {
        backendCalls.push({ method, input });

        if (method === "startPrompt") {
          return { activeSessionId: input.data.sessionId, runId: `run-${backendCalls.filter((call) => call.method === "startPrompt").length}`, isStreaming: true };
        }

        if (method === "steerPrompt") {
          throw new Error("unknown method: steerPrompt");
        }

        return {};
      },
      backendStream: async (_method, _input, options) => {
        return new ReadableStream({
          start(controller) {
            if (!firstStreamController) {
              firstStreamController = controller;
            }

            options?.signal?.addEventListener("abort", () => controller.close());
          },
        });
      },
      mount: createMount(window, app),
    });

    const textarea = window.document.querySelector(".prompt-textarea");
    textarea.value = "first";
    textarea.dispatchEvent(new window.Event("input", { bubbles: true }));
    window.document.querySelector(".send-btn").click();
    await tick();
    assert.ok(firstStreamController);

    textarea.value = "second";
    textarea.dispatchEvent(new window.Event("input", { bubbles: true }));
    window.document.querySelector(".send-btn").click();
    await tick(STEERING_CANCEL_WAIT_MS);
    await tick();

    assert.equal(backendCalls.filter((call) => call.method === "steerPrompt").length, 1);
    assert.equal(backendCalls.filter((call) => call.method === "startPrompt").length, 1);
    assert.equal(backendCalls.filter((call) => call.method === "submitPrompt").length, 0);
    cleanup();
  });
});

test("mounted activation restores loading controls for streaming selected session", async () => {
  await withWindow(async ({ window }) => {
    const app = window.document.querySelector("pi-app");
    const backendCalls = [];
    app.piWebSidebar = { getSnapshot: () => ({ activeSessionId: "restored-session", activeWorkspaceId: "workspace-1" }) };
    const cleanup = activate({
      app,
      backend: async (method, input) => {
        backendCalls.push({ method, input });

        if (method === "chatState") {
          return {
            activeSessionId: input.data.sessionId,
            runId: "restored-run",
            isStreaming: true,
            messages: [{ id: "a1", role: "assistant", text: "partial", createdAt: 1, streaming: true }],
          };
        }

        return {};
      },
      mount: createMount(window, app),
    });

    await tick();
    await tick();

    const sendButton = window.document.querySelector(".send-btn");
    const stopButton = window.document.querySelector(".stop-btn");
    assert.equal(sendButton.dataset.mode, "loading");
    assert.equal(sendButton.getAttribute("aria-label"), "loading");
    assert.equal(stopButton.hidden, false);

    stopButton.click();
    await tick();

    assert.equal(backendCalls.find((call) => call.method === "abortPrompt").input.data.runId, "restored-run");
    cleanup();
  });
});

test("mounted composer shows loading send and stop aborts active run", async () => {
  await withWindow(async ({ window }) => {
    const app = window.document.querySelector("pi-app");
    const backendCalls = [];
    let activeWorkspaceId = "workspace-1";
    let streamController;
    app.piWebSidebar = {
      getSnapshot: () => ({
        activeWorkspaceId,
        workspaces: [{ id: "workspace-1", path: "/tmp/workspace-1" }, { id: "workspace-2", path: "/tmp/workspace-2" }],
      }),
    };

    const cleanup = activate({
      app,
      backend: async (method, input) => {
        backendCalls.push({ method, input });

        if (method === "startPrompt") {
          return { activeSessionId: "loading-session", runId: "loading-run", isStreaming: true };
        }

        return {};
      },
      backendStream: async (method, _input, options) => {
        if (method === "streamEventsSse") {
          return new ReadableStream({
            start(controller) {
              streamController = controller;
              options?.signal?.addEventListener("abort", () => controller.close());
            },
          });
        }

        return new ReadableStream({ start() {} });
      },
      mount: createMount(window, app),
    });

    const textarea = window.document.querySelector(".prompt-textarea");
    const sendButton = window.document.querySelector(".send-btn");
    const stopButton = window.document.querySelector(".stop-btn");
    textarea.value = "first";
    textarea.dispatchEvent(new window.Event("input", { bubbles: true }));
    sendButton.click();
    await tick();

    assert.ok(streamController);
    assert.equal(sendButton.dataset.mode, "loading");
    assert.equal(sendButton.querySelector(".spinner"), null);
    assert.equal(sendButton.querySelector(".composer-spinner") !== null, true);
    assert.equal(stopButton.hidden, false);

    activeWorkspaceId = "workspace-2";
    stopButton.click();
    await tick();
    await tick();

    assert.equal(backendCalls.filter((call) => call.method === "abortPrompt").length, 1);
    assert.equal(backendCalls.find((call) => call.method === "abortPrompt").input.data.runId, "loading-run");
    assert.equal(backendCalls.find((call) => call.method === "abortPrompt").input.workspaceId, "workspace-1");
    cleanup();
  });
});

test("mounted stop during start aborts backend run after run id arrives", async () => {
  await withWindow(async ({ window }) => {
    const app = window.document.querySelector("pi-app");
    const backendCalls = [];
    let resolveStart;

    const cleanup = activate({
      app,
      backend: async (method, input) => {
        backendCalls.push({ method, input });

        if (method === "startPrompt") {
          await new Promise((resolve) => { resolveStart = resolve; });
          return { activeSessionId: "starting-session", runId: "late-run", isStreaming: true };
        }

        return {};
      },
      backendStream: async () => new ReadableStream({ start() {} }),
      mount: createMount(window, app),
    });

    const textarea = window.document.querySelector(".prompt-textarea");
    const stopButton = window.document.querySelector(".stop-btn");
    textarea.value = "first";
    textarea.dispatchEvent(new window.Event("input", { bubbles: true }));
    window.document.querySelector(".send-btn").click();
    await tick();

    assert.equal(stopButton.hidden, false);
    stopButton.click();
    resolveStart();
    await tick();
    await tick();

    assert.equal(backendCalls.filter((call) => call.method === "abortPrompt").length, 1);
    assert.equal(backendCalls.find((call) => call.method === "abortPrompt").input.data.runId, "late-run");
    cleanup();
  });
});

test("mounted steering can be cancelled before backend dispatch", async () => {
  await withWindow(async ({ window }) => {
    const app = window.document.querySelector("pi-app");
    const backendCalls = [];
    let streamController;

    const cleanup = activate({
      app,
      backend: async (method, input) => {
        backendCalls.push({ method, input });

        if (method === "startPrompt") {
          return { activeSessionId: "steer-cancel-session", runId: "steer-cancel-run", isStreaming: true };
        }

        if (method === "steerPrompt") {
          return { accepted: true, activeSessionId: input.data.sessionId, runId: input.data.runId, isStreaming: true };
        }

        return {};
      },
      backendStream: async (method, _input, options) => {
        if (method === "streamEventsSse") {
          return new ReadableStream({
            start(controller) {
              streamController = controller;
              options?.signal?.addEventListener("abort", () => controller.close(), { once: true });
            },
          });
        }

        return new ReadableStream({ start() {} });
      },
      mount: createMount(window, app),
    });

    const textarea = window.document.querySelector(".prompt-textarea");
    const sendButton = window.document.querySelector(".send-btn");
    const stopButton = window.document.querySelector(".stop-btn");
    try {
      textarea.value = "first";
      textarea.dispatchEvent(new window.Event("input", { bubbles: true }));
      sendButton.click();
      await tick();
      assert.ok(streamController);

      textarea.value = "second";
      textarea.dispatchEvent(new window.Event("input", { bubbles: true }));
      sendButton.click();
      await tick();

      assert.equal(sendButton.dataset.mode, "steering");
      assert.equal(stopButton.title, "cancel steering");
      assert.equal(window.document.querySelector(".pending-steering-text").textContent, "second");
      assert.equal(window.document.querySelector("[data-action='cancel-steering']").title, "cancel steering");
      window.document.querySelector("[data-action='cancel-steering']").click();
      await tick(STEERING_CANCEL_WAIT_MS);

      const store = JSON.parse(window.localStorage.getItem("pi-web-chat.sessions.v1"));
      const session = store.sessions.find((item) => item.id === "steer-cancel-session");
      assert.equal(backendCalls.filter((call) => call.method === "steerPrompt").length, 0);
      assert.deepEqual(session.messages.filter((message) => message.role === "user").map((message) => message.text), ["first"]);
    } finally {
      cleanup();
    }
  });
});

test("mounted pending steering ignores keyboard resubmit until it is dispatched", async () => {
  await withWindow(async ({ window }) => {
    const app = window.document.querySelector("pi-app");
    const backendCalls = [];

    const cleanup = activate({
      app,
      backend: async (method, input) => {
        backendCalls.push({ method, input });

        if (method === "startPrompt") {
          return { activeSessionId: "steer-guard-session", runId: "steer-guard-run", isStreaming: true };
        }

        if (method === "steerPrompt") {
          return { accepted: true, activeSessionId: input.data.sessionId, runId: input.data.runId, isStreaming: true };
        }

        return {};
      },
      backendStream: async () => new ReadableStream({ start() {} }),
      mount: createMount(window, app),
    });

    const textarea = window.document.querySelector(".prompt-textarea");
    textarea.value = "first";
    textarea.dispatchEvent(new window.Event("input", { bubbles: true }));
    window.document.querySelector(".send-btn").click();
    await tick();

    textarea.value = "second";
    textarea.dispatchEvent(new window.Event("input", { bubbles: true }));
    window.document.querySelector(".send-btn").click();
    await tick();

    textarea.value = "third";
    textarea.dispatchEvent(new window.Event("input", { bubbles: true }));
    textarea.dispatchEvent(new window.KeyboardEvent("keydown", { key: "Enter", metaKey: true, bubbles: true }));
    await tick(STEERING_CANCEL_WAIT_MS);

    assert.equal(backendCalls.filter((call) => call.method === "steerPrompt").length, 1);
    assert.equal(backendCalls.find((call) => call.method === "steerPrompt").input.data.text, "second");
    cleanup();
  });
});

test("mounted submit while streaming sends steering without aborting or starting a new run", async () => {
  await withWindow(async ({ window }) => {
    const app = window.document.querySelector("pi-app");
    const backendCalls = [];
    const encoder = new TextEncoder();
    let activeWorkspaceId = "workspace-1";
    let streamController;
    app.piWebSidebar = {
      getSnapshot: () => ({
        activeWorkspaceId,
        workspaces: [{ id: "workspace-1", path: "/tmp/workspace-1" }, { id: "workspace-2", path: "/tmp/workspace-2" }],
      }),
    };

    const cleanup = activate({
      app,
      backend: async (method, input) => {
        backendCalls.push({ method, input });

        if (method === "startPrompt") {
          return { activeSessionId: "active-run-session", runId: "active-run", isStreaming: true };
        }

        if (method === "steerPrompt") {
          return { accepted: true, activeSessionId: input.data.sessionId, runId: input.data.runId, isStreaming: true };
        }

        return {};
      },
      backendStream: async (method) => {
        if (method === "streamEventsSse") {
          return new ReadableStream({
            start(controller) {
              streamController = controller;
            },
          });
        }

        if (method === "sessionEventsSse") {
          const state = JSON.stringify({
            type: "chat.state",
            activeSessionId: "active-run-session",
            messages: [
              { id: "backend-first", role: "user", text: "first", createdAt: 1 },
              { id: "backend-second", role: "user", text: "second", createdAt: 2 },
            ],
          });

          return new ReadableStream({
            start(controller) {
              controller.enqueue(encoder.encode(`event: chat.state\ndata: ${state}\n\n`));
              controller.close();
            },
          });
        }

        return new ReadableStream({ start() {} });
      },
      mount: createMount(window, app),
    });

    const textarea = window.document.querySelector(".prompt-textarea");
    textarea.value = "first";
    textarea.dispatchEvent(new window.Event("input", { bubbles: true }));
    window.document.querySelector(".send-btn").click();
    await tick();
    assert.ok(streamController);

    activeWorkspaceId = "workspace-2";
    textarea.value = "second";
    textarea.dispatchEvent(new window.Event("input", { bubbles: true }));
    window.document.querySelector(".send-btn").click();
    await tick(STEERING_CANCEL_WAIT_MS);

    assert.equal(backendCalls.filter((call) => call.method === "startPrompt").length, 1);
    assert.equal(backendCalls.filter((call) => call.method === "submitPrompt").length, 0);
    assert.equal(backendCalls.filter((call) => call.method === "abortPrompt").length, 0);
    const steerCall = backendCalls.find((call) => call.method === "steerPrompt");
    assert.equal(steerCall.input.workspaceId, "workspace-1");
    assert.equal(steerCall.input.data.workspacePath, "/tmp/workspace-1");
    assert.equal(steerCall.input.data.runId, "active-run");
    assert.equal(steerCall.input.data.text, "second");

    streamController.enqueue(encoder.encode('event: run.end\ndata: {"type":"run.end"}\n\n'));
    streamController.close();
    await tick();
    await tick();

    const store = JSON.parse(window.localStorage.getItem("pi-web-chat.sessions.v1"));
    const session = store.sessions.find((item) => item.id === "active-run-session");
    const userMessages = session.messages.filter((message) => message.role === "user");
    assert.deepEqual(userMessages.map((message) => message.id), ["backend-first", "backend-second"]);
    cleanup();
  });
});

test("mounted streaming render preserves ordered thinking text and tool blocks", async () => {
  await withWindow(async ({ window }) => {
    const app = window.document.querySelector("pi-app");
    const encoder = new TextEncoder();
    let runController;

    const cleanup = activate({
      app,
      backend: async (method, input) => {
        if (method === "startPrompt") {
          return { activeSessionId: input.data.sessionId, runId: "ordered-run", isStreaming: true };
        }

        return {};
      },
      backendStream: async (method) => {
        if (method === "streamEventsSse") {
          return new ReadableStream({
            start(controller) {
              runController = controller;
            },
          });
        }

        return new ReadableStream({ start() {} });
      },
      mount: createMount(window, app),
    });

    const textarea = window.document.querySelector(".prompt-textarea");
    textarea.value = "ordered stream";
    textarea.dispatchEvent(new window.Event("input", { bubbles: true }));
    window.document.querySelector(".send-btn").click();
    await tick();

    runController.enqueue(encoder.encode('event: thinking.delta\ndata: {"type":"thinking.delta","delta":"think 1"}\n\n'));
    runController.enqueue(encoder.encode('event: text.delta\ndata: {"type":"text.delta","delta":"answer 1"}\n\n'));
    runController.enqueue(encoder.encode('event: tool.start\ndata: {"type":"tool.start","toolCallId":"t1","toolName":"bash","argsStatus":"empty"}\n\n'));
    runController.enqueue(encoder.encode('event: thinking.delta\ndata: {"type":"thinking.delta","delta":"think 2"}\n\n'));
    runController.enqueue(encoder.encode('event: text.delta\ndata: {"type":"text.delta","delta":"answer 2"}\n\n'));
    runController.enqueue(encoder.encode('event: run.end\ndata: {"type":"run.end"}\n\n'));
    runController.close();
    await tick(300);
    await tick();

    const assistantItem = window.document.querySelectorAll(".transcript-item")[1];
    const ordered = [...assistantItem.children].map((child) => {
      if (child.classList.contains("thinking-block")) {
        return `thinking:${child.querySelector(".body").textContent}`;
      }

      if (child.classList.contains("tool-card")) {
        return `tool:${child.dataset.tool}`;
      }

      return `text:${child.querySelector(".body").textContent}`;
    });

    assert.deepEqual(ordered, ["thinking:think 1", "text:answer 1", "tool:bash", "thinking:think 2", "text:answer 2"]);
    cleanup();
  });
});

test("mounted streaming render preserves unchanged transcript item nodes", async () => {
  await withWindow(async ({ window }) => {
    const app = window.document.querySelector("pi-app");
    const encoder = new TextEncoder();
    let runController;

    const cleanup = activate({
      app,
      backend: async (method, input) => {
        if (method === "startPrompt") {
          return { activeSessionId: input.data.sessionId, runId: "stream-run", isStreaming: true };
        }

        return {};
      },
      backendStream: async (method) => {
        if (method === "streamEventsSse") {
          return new ReadableStream({
            start(controller) {
              runController = controller;
            },
          });
        }

        return new ReadableStream({ start() {} });
      },
      mount: createMount(window, app),
    });

    const textarea = window.document.querySelector(".prompt-textarea");
    textarea.value = "stream keyed";
    textarea.dispatchEvent(new window.Event("input", { bubbles: true }));
    window.document.querySelector(".send-btn").click();
    await tick();

    runController.enqueue(encoder.encode('event: text.delta\ndata: {"type":"text.delta","delta":"a"}\n\n'));
    await tick(300);
    const firstItems = [...window.document.querySelectorAll(".transcript-item")];
    firstItems[0].tabIndex = -1;
    firstItems[0].focus();

    runController.enqueue(encoder.encode('event: text.delta\ndata: {"type":"text.delta","delta":"b"}\n\n'));
    await tick(300);
    const secondItems = [...window.document.querySelectorAll(".transcript-item")];

    assert.equal(firstItems.length, 2);
    assert.equal(secondItems.length, 2);
    assert.equal(secondItems[0], firstItems[0]);
    assert.equal(secondItems[1], firstItems[1]);
    assert.equal(window.document.activeElement, firstItems[0]);
    assert.match(secondItems[1].textContent, /ab/);
    cleanup();
  });
});

test("mounted streaming save throttles localStorage writes during rapid deltas", async () => {
  await withWindow(async ({ window }) => {
    const app = window.document.querySelector("pi-app");
    const encoder = new TextEncoder();
    let runController;
    let writeCount = 0;
    const originalSetItem = window.localStorage.setItem.bind(window.localStorage);
    window.localStorage.setItem = (key, value) => {
      if (key === "pi-web-chat.sessions.v1") {
        writeCount += 1;
      }

      return originalSetItem(key, value);
    };

    const cleanup = activate({
      app,
      backend: async (method, input) => {
        if (method === "startPrompt") {
          return { activeSessionId: input.data.sessionId, runId: "throttle-run", isStreaming: true };
        }

        return {};
      },
      backendStream: async (method) => {
        if (method === "streamEventsSse") {
          return new ReadableStream({
            start(controller) {
              runController = controller;
            },
          });
        }

        return new ReadableStream({ start() {} });
      },
      mount: createMount(window, app),
    });

    const textarea = window.document.querySelector(".prompt-textarea");
    textarea.value = "rapid stream";
    textarea.dispatchEvent(new window.Event("input", { bubbles: true }));
    window.document.querySelector(".send-btn").click();
    await tick();
    writeCount = 0;

    for (const delta of ["a", "b", "c", "d", "e"]) {
      runController.enqueue(encoder.encode(`event: text.delta\ndata: {"type":"text.delta","delta":"${delta}"}\n\n`));
    }

    await tick(30);

    assert.ok(writeCount < 5);
    cleanup();
  });
});

test("mounted streaming save flushes latest content when stream closes", async () => {
  await withWindow(async ({ window }) => {
    const app = window.document.querySelector("pi-app");
    const encoder = new TextEncoder();
    let runController;

    const cleanup = activate({
      app,
      backend: async (method, input) => {
        if (method === "startPrompt") {
          return { activeSessionId: input.data.sessionId, runId: "flush-run", isStreaming: true };
        }

        return {};
      },
      backendStream: async (method) => {
        if (method === "streamEventsSse") {
          return new ReadableStream({
            start(controller) {
              runController = controller;
            },
          });
        }

        return new ReadableStream({ start() {} });
      },
      mount: createMount(window, app),
    });

    const textarea = window.document.querySelector(".prompt-textarea");
    textarea.value = "flush stream";
    textarea.dispatchEvent(new window.Event("input", { bubbles: true }));
    window.document.querySelector(".send-btn").click();
    await tick();

    runController.enqueue(encoder.encode('event: text.delta\ndata: {"type":"text.delta","delta":"latest"}\n\n'));
    runController.close();
    await tick();
    await tick();

    const store = JSON.parse(window.localStorage.getItem("pi-web-chat.sessions.v1"));
    const session = store.sessions.find((item) => item.messages.some((message) => message.text === "flush stream"));
    assert.equal(session.messages.find((message) => message.role === "assistant").text, "latest");
    cleanup();
  });
});

test("mounted submit emits backend warnings as toasts", async () => {
  await withWindow(async ({ window }) => {
    const app = window.document.querySelector("pi-app");
    const toasts = [];
    globalThis.piWeb.subject("toast.requested").subscribe((toast) => toasts.push(toast));

    const cleanup = activate({
      app,
      backend: async (method, input) => {
        if (method === "startPrompt") {
          return {
            activeSessionId: input.data.sessionId,
            warnings: [".pi/settings.json sessionDir escapes the workspace; using the default session directory", 7, ""],
          };
        }

        if (method === "submitPrompt") {
          return { activeSessionId: input.data.sessionId, messages: [] };
        }

        return {};
      },
      mount: createMount(window, app),
    });

    const textarea = window.document.querySelector(".prompt-textarea");
    textarea.value = "warn me";
    textarea.dispatchEvent(new window.Event("input", { bubbles: true }));
    window.document.querySelector(".send-btn").click();
    await tick();

    assert.deepEqual(toasts, [{
      level: "warning",
      message: ".pi/settings.json sessionDir escapes the workspace; using the default session directory",
    }]);
    cleanup();
  });
});

test("mounted submit sends selected workspace path with prompt", async () => {
  await withWindow(async ({ window, backendCalls }) => {
    const app = window.document.querySelector("pi-app");
    app.dataset.activeWorkspaceId = "workspace-selected";
    app.piWebSidebar = {
      getSnapshot: () => ({
        activeWorkspaceId: "workspace-selected",
        activeSessionId: "workspace-session",
        workspaces: [{ id: "workspace-selected", path: "/tmp/workspace-selected" }],
      }),
    };

    const cleanup = activate({
      app,
      backend: async (method, input) => {
        backendCalls.push({ method, input });

        if (method === "startPrompt") {
          return {};
        }

        if (method === "submitPrompt") {
          return { activeSessionId: input.data.sessionId, messages: [{ id: "u1", role: "user", text: input.data.text, createdAt: 1 }] };
        }

        return {};
      },
      mount: createMount(window, app),
    });

    const textarea = window.document.querySelector(".prompt-textarea");
    textarea.value = "workspace prompt";
    textarea.dispatchEvent(new window.Event("input", { bubbles: true }));
    window.document.querySelector(".send-btn").click();
    await tick();

    const startCall = backendCalls.find((call) => call.method === "startPrompt");
    const submitCall = backendCalls.find((call) => call.method === "submitPrompt");

    assert.equal(startCall.input.data.sessionId, "workspace-session");
    assert.equal(startCall.input.data.workspacePath, "/tmp/workspace-selected");
    assert.equal(submitCall.input.data.workspacePath, "/tmp/workspace-selected");
    cleanup();
  });
});

test("mounted submit keeps captured viewed session during startPrompt fallback race", async () => {
  await withWindow(async ({ window, backendCalls }) => {
    const app = window.document.querySelector("pi-app");
    let viewedSession = "clicked-session";
    let viewedWorkspaceId = "workspace-clicked";
    let releaseStart;
    const startReady = new Promise((resolve) => { releaseStart = resolve; });
    app.piWebSidebar = {
      getSnapshot: () => ({
        activeWorkspaceId: viewedWorkspaceId,
        activeSessionId: viewedSession,
        workspaces: [
          { id: "workspace-clicked", path: "/tmp/workspace-clicked" },
          { id: "workspace-later", path: "/tmp/workspace-later" },
        ],
      }),
    };

    const cleanup = activate({
      app,
      backend: async (method, input) => {
        backendCalls.push({ method, input });

        if (method === "startPrompt") {
          await startReady;
          return { activeSessionId: "backend-created-session" };
        }

        if (method === "submitPrompt") {
          return { messages: [{ id: "u1", role: "user", text: input.data.text, createdAt: 1 }] };
        }

        return {};
      },
      mount: createMount(window, app),
    });

    await tick();
    const textarea = window.document.querySelector(".prompt-textarea");
    textarea.value = "race-safe prompt";
    textarea.dispatchEvent(new window.Event("input", { bubbles: true }));
    window.document.querySelector(".send-btn").click();
    await tick();
    viewedSession = "later-session";
    viewedWorkspaceId = "workspace-later";
    app.dataset.activeWorkspaceId = "workspace-later";
    globalThis.piWeb.behaviorSubject("session.activeId", null).next("later-session");
    releaseStart();
    await tick();
    await tick();

    const startCall = backendCalls.find((call) => call.method === "startPrompt");
    const submitCall = backendCalls.find((call) => call.method === "submitPrompt");
    const store = JSON.parse(window.localStorage.getItem("pi-web-chat.sessions.v1"));
    const later = store.sessions.find((session) => session.id === "later-session");

    assert.equal(startCall.input.data.sessionId, "clicked-session");
    assert.equal(startCall.input.data.workspacePath, "/tmp/workspace-clicked");
    assert.equal(submitCall.input.data.sessionId, "backend-created-session");
    assert.equal(submitCall.input.data.workspacePath, "/tmp/workspace-clicked");
    assert.equal(store.activeSessionId, "later-session");
    assert.equal(store.sessions.some((session) => session.id === "backend-created-session"), true);
    assert.doesNotMatch(JSON.stringify(later.messages), /race-safe prompt/);
    cleanup();
  });
});

test("mounted streaming keeps captured session stream alive during later switch", async () => {
  await withWindow(async ({ window }) => {
    const app = window.document.querySelector("pi-app");
    const encoder = new TextEncoder();
    let viewedSession = "clicked-stream-session";
    let releaseStream;
    const streamReady = new Promise((resolve) => { releaseStream = resolve; });
    app.piWebSidebar = { getSnapshot: () => ({ activeWorkspaceId: "workspace-1", activeSessionId: viewedSession }) };

    const cleanup = activate({
      app,
      backend: async (method) => {
        if (method === "startPrompt") {
          return { activeSessionId: "clicked-stream-session", runId: "run-stream-race", isStreaming: true };
        }

        return {};
      },
      backendStream: async (method, input, options) => {
        if (method === "sessionEventsSse") {
          return new ReadableStream({ start() {} });
        }

        if (method === "streamEventsSse") {
          await streamReady;
          return new ReadableStream({
            start(controller) {
              assert.equal(options?.signal?.aborted, false);
              controller.enqueue(encoder.encode('event: text.delta\ndata: {"type":"text.delta","delta":"captured answer"}\n\n'));
              controller.enqueue(encoder.encode('event: run.end\ndata: {"type":"run.end"}\n\n'));
              controller.close();
            },
          });
        }

        return {};
      },
      mount: createMount(window, app),
    });

    await tick();
    const textarea = window.document.querySelector(".prompt-textarea");
    textarea.value = "stream race";
    textarea.dispatchEvent(new window.Event("input", { bubbles: true }));
    window.document.querySelector(".send-btn").click();
    await tick();
    viewedSession = "later-stream-session";
    globalThis.piWeb.behaviorSubject("session.activeId", null).next("later-stream-session");
    releaseStream();
    await tick();
    await tick();

    const store = JSON.parse(window.localStorage.getItem("pi-web-chat.sessions.v1"));
    const clicked = store.sessions.find((session) => session.id === "clicked-stream-session");
    const later = store.sessions.find((session) => session.id === "later-stream-session");

    assert.match(JSON.stringify(clicked.messages), /captured answer/);
    assert.doesNotMatch(JSON.stringify(later.messages), /captured answer/);
    cleanup();
  });
});

test("mounted submit streams through SSE and notifies sidebar refresh channel", async () => {
  await withWindow(async ({ window, backendCalls }) => {
    const app = window.document.querySelector("pi-app");
    const submitted = [];
    const sessionChanges = [];
    const encoder = new TextEncoder();
    globalThis.piWeb.subject("chat.input.submitted").subscribe((event) => submitted.push(event));
    globalThis.piWeb.subject("session.changed").subscribe((event) => sessionChanges.push(event));

    const cleanup = activate({
      app,
      backend: async (method, input) => {
        backendCalls.push({ method, input });

        if (method === "startPrompt") {
          return { activeSessionId: "stream-session", runId: "run-1", isStreaming: true };
        }

        if (method === "chatState" && input.data.sessionId === "stream-session") {
          return { activeSessionId: "stream-session", messages: [{ id: "a1", role: "assistant", text: "final answer", createdAt: 2 }] };
        }

        return {};
      },
      backendStream: async (method, input) => {
        backendCalls.push({ method, input });

        if (method === "sessionEventsSse") {
          return new ReadableStream({
            start(controller) {
              controller.enqueue(encoder.encode('event: chat.state\ndata: {"type":"chat.state","activeSessionId":"stream-session","messages":[]}\n\n'));
              controller.close();
            },
          });
        }

        if (method === "streamEventsSse") {
          return new ReadableStream({
            start(controller) {
              controller.enqueue(encoder.encode('event: text.delta\ndata: {"type":"text.delta","delta":"streamed answer"}\n\n'));
              controller.enqueue(encoder.encode('event: tool.start\ndata: {"type":"tool.start","toolCallId":"t1","toolName":"read","args":{"path":"README.md"},"argsStatus":"present"}\n\n'));
              controller.enqueue(encoder.encode('event: tool.end\ndata: {"type":"tool.end","toolCallId":"t1","toolName":"read","args":{},"argsStatus":"unavailable"}\n\n'));
              controller.enqueue(encoder.encode('event: run.end\ndata: {"type":"run.end","exitCode":0}\n\n'));
              controller.close();
            },
          });
        }

        return {};
      },
      mount: createMount(window, app),
    });

    await tick();
    const textarea = window.document.querySelector(".prompt-textarea");
    textarea.value = "stream me";
    textarea.dispatchEvent(new window.Event("input", { bubbles: true }));
    window.document.querySelector(".send-btn").click();
    await tick();
    await tick();

    assert.deepEqual(submitted.map((event) => event.text), ["stream me"]);
    assert.ok(backendCalls.some((call) => call.method === "startPrompt" && call.input.data.text === "stream me"));
    assert.ok(backendCalls.some((call) => call.method === "streamEventsSse" && call.input.data.runId === "run-1"));
    assert.equal(backendCalls.some((call) => call.method === "streamEvents"), false);
    const streamIndex = backendCalls.findIndex((call) => call.method === "streamEventsSse");
    assert.equal(backendCalls.slice(streamIndex + 1).some((call) => {
      return call.method === "chatState" && call.input.data.sessionId === "stream-session";
    }), false);
    assert.equal(window.localStorage.getItem("plugin.pi-web-sidebar.activeSessionId"), "stream-session");
    assert.equal(globalThis.piWeb.behaviorSubject("session.activeId", null).getValue(), "stream-session");
    assert.equal(window.document.querySelector("[data-plugin-chat-root]")?.classList.contains("pi-web-chat-surface"), true);
    assert.deepEqual(sessionChanges, [{ sessionId: "stream-session", name: "stream me", title: "stream me" }]);
    assert.match(window.document.querySelector(".term-inner").textContent, /final answer|streamed answer/);
    assert.equal(window.document.querySelector(".tool-card .tc-args").textContent, JSON.stringify({ path: "README.md" }));
    cleanup();
  });
});

test("mounted submit never polls streamEvents when SSE succeeds", async () => {
  await withWindow(async ({ window, backendCalls }) => {
    const app = window.document.querySelector("pi-app");
    const encoder = new TextEncoder();

    const cleanup = activate({
      app,
      backend: async (method, input) => {
        backendCalls.push({ method, input });

        if (method === "startPrompt") {
          return { activeSessionId: "sse-session", runId: "run-sse", isStreaming: true };
        }

        if (method === "chatState" && input.data.sessionId === "sse-session") {
          return { activeSessionId: "sse-session", messages: [{ id: "a1", role: "assistant", text: "final sse", createdAt: 2 }] };
        }

        return {};
      },
      backendStream: async (method, input) => {
        backendCalls.push({ method, input });

        if (method === "sessionEventsSse") {
          return new ReadableStream({
            start(controller) {
              controller.enqueue(encoder.encode('event: chat.state\ndata: {"type":"chat.state","activeSessionId":"sse-session","messages":[]}\n\n'));
              controller.close();
            },
          });
        }

        if (method === "streamEventsSse") {
          return new ReadableStream({
            start(controller) {
              controller.enqueue(encoder.encode('event: text.delta\ndata: {"type":"text.delta","delta":"hello "}\n\n'));
              controller.enqueue(encoder.encode('event: text.delta\ndata: {"type":"text.delta","delta":"sse"}\n\n'));
              controller.enqueue(encoder.encode('event: run.end\ndata: {"type":"run.end","exitCode":0}\n\n'));
              controller.close();
            },
          });
        }

        return {};
      },
      mount: createMount(window, app),
    });

    await tick();
    const textarea = window.document.querySelector(".prompt-textarea");
    textarea.value = "stream with sse";
    textarea.dispatchEvent(new window.Event("input", { bubbles: true }));
    window.document.querySelector(".send-btn").click();
    await tick();
    await tick();

    assert.ok(backendCalls.some((call) => call.method === "streamEventsSse" && call.input.data.runId === "run-sse"));
    assert.equal(backendCalls.some((call) => call.method === "streamEvents"), false);
    const streamIndex = backendCalls.findIndex((call) => call.method === "streamEventsSse");
    assert.equal(backendCalls.slice(streamIndex + 1).some((call) => {
      return call.method === "chatState" && call.input.data.sessionId === "sse-session";
    }), false);
    assert.match(window.document.querySelector(".term-inner").textContent, /hello sse|final sse/);
    cleanup();
  });
});

test("mounted submit keeps text typed while stream is in flight", async () => {
  await withWindow(async ({ window }) => {
    const app = window.document.querySelector("pi-app");
    const encoder = new TextEncoder();
    let releaseRun;
    const runReady = new Promise((resolve) => { releaseRun = resolve; });

    const cleanup = activate({
      app,
      backend: async (method) => {
        if (method === "startPrompt") {
          return { activeSessionId: "draft-session", runId: "run-draft", isStreaming: true };
        }

        return {};
      },
      backendStream: async (method) => {
        if (method === "sessionEventsSse") {
          return new ReadableStream({
            start(controller) {
              controller.enqueue(encoder.encode('event: chat.state\ndata: {"type":"chat.state","activeSessionId":"draft-session","messages":[]}\n\n'));
              controller.close();
            },
          });
        }

        if (method === "streamEventsSse") {
          await runReady;
          return new ReadableStream({
            start(controller) {
              controller.enqueue(encoder.encode('event: text.delta\ndata: {"type":"text.delta","delta":"answer"}\n\n'));
              controller.enqueue(encoder.encode('event: run.end\ndata: {"type":"run.end"}\n\n'));
              controller.close();
            },
          });
        }

        return {};
      },
      mount: createMount(window, app),
    });

    const textarea = window.document.querySelector(".prompt-textarea");
    textarea.value = "first prompt";
    textarea.dispatchEvent(new window.Event("input", { bubbles: true }));
    window.document.querySelector(".send-btn").click();
    await tick();
    textarea.value = "second draft";
    releaseRun();
    await tick();
    await tick();

    assert.equal(textarea.value, "second draft");
    cleanup();
  });
});

test("mounted tool calls render collapsed cards with tool icons", async () => {
  await withWindow(async ({ window }) => {
    const app = window.document.querySelector("pi-app");
    app.piWebSidebar = { getSnapshot: () => ({ activeSessionId: "tool-session", activeWorkspaceId: "workspace-1" }) };

    let updated = false;
    const toolMessages = (runningText) => [{
      id: "a1",
      role: "assistant",
      text: "used tools",
      createdAt: 1,
      thinking: "**Evaluating git status**\n\nI should inspect the repository before answering.",
      toolCalls: [
        { id: "t1", name: "read", text: "README.md", status: "ok" },
        { id: "t2", name: "bash", args: { command: "git status" }, text: "clean", status: "ok" },
        { id: "t3", name: "unknown_tool", text: "dot", status: "ok" },
        { id: "t4", name: "bash", args: { command: "bun test" }, text: runningText, status: "running" },
      ],
    }];
    const cleanup = activate({
      app,
      backend: async (method, input) => {
        if (method === "chatState") {
          return {
            activeSessionId: input.data.sessionId || "tool-session",
            messages: toolMessages(updated ? "running update" : "running"),
          };
        }

        return {};
      },
      mount: createMount(window, app),
    });

    await tick();
    await tick();

    const cards = [...window.document.querySelectorAll(".tool-card")];
    assert.equal(cards.length, 4);
    assert.equal(cards.every((card) => card.dataset.collapsed === "true"), true);
    assert.equal(cards.every((card) => card.querySelector(".tc-body") === null), true);
    assert.equal(cards[3].querySelector(".tc-head").getAttribute("aria-expanded"), "false");
    assert.equal(cards[3].querySelector(".tc-head").getAttribute("aria-label"), "Show bash output, running, arguments present");
    assert.equal(cards[0].querySelector(".tc-head").getAttribute("aria-label"), "Show read output, done");
    assert.ok(cards[0].querySelector("[data-tool-icon='book-open']"));
    assert.ok(cards[1].querySelector("[data-tool-icon='git-branch']"));
    assert.equal(cards[1].querySelector(".tc-args").textContent, JSON.stringify({ command: "git status" }));
    assert.equal(cards[2].querySelector(".tc-glyph").textContent, "●");
    assert.ok(cards[3].querySelector("[data-tool-icon='circle-check']"));
    assert.equal(cards[3].querySelectorAll(".tc-meta .spinner span").length, 6);
    assert.equal(cards[3].querySelector(".tc-meta .spinner").hasAttribute("data-frame"), false);
    assert.equal(cards[3].querySelector(".tc-meta .running").textContent, "running");
    assert.equal(cards[3].querySelector(".tc-meta .ok"), null);
    assert.equal(cards[3].querySelector(".tc-toggle-label").textContent, "show");
    cards[3].querySelector(".tc-head").click();
    assert.equal(cards[3].dataset.collapsed, "false");
    assert.equal(cards[3].querySelector(".tc-body").textContent, "running");
    assert.equal(cards[3].querySelector(".tc-toggle-label").textContent, "hide");

    updated = true;
    globalThis.piWeb.behaviorSubject("session.activeId", null).next("tool-session");
    await tick();
    await tick();

    const unchangedRunningCard = window.document.querySelectorAll(".tool-card")[3];
    assert.equal(unchangedRunningCard.dataset.collapsed, "false");
    assert.equal(unchangedRunningCard.querySelector(".tc-body").textContent, "running");

    globalThis.piWeb.behaviorSubject("session.activeId", null).next("other-tool-session");
    await tick();
    await tick();

    const otherCards = [...window.document.querySelectorAll(".tool-card")];
    const otherRunningCard = otherCards[3];
    assert.equal(otherRunningCard.dataset.collapsed, "true");
    assert.equal(otherRunningCard.querySelector(".tc-head").getAttribute("aria-expanded"), "false");
    assert.equal(otherRunningCard.querySelector(".tc-body"), null);
    assert.equal(otherRunningCard.querySelector(".tc-toggle-label").textContent, "show");
    assert.equal(window.document.querySelector(".thinking-block .label").textContent, "THINKING");
    assert.match(window.document.querySelector(".thinking-block .body").textContent, /Evaluating git status/);

    otherCards[0].querySelector(".tc-head").click();
    assert.equal(otherCards[0].dataset.collapsed, "false");
    assert.equal(otherCards[0].querySelector(".tc-head").getAttribute("aria-expanded"), "true");
    assert.equal(otherCards[0].querySelector(".tc-head").getAttribute("aria-label"), "Hide read output, done");
    assert.equal(otherCards[0].querySelector(".tc-body").textContent, "README.md");
    cleanup();

    const remountCleanup = activate({
      app,
      backend: async (method, input) => {
        if (method === "chatState") {
          return { activeSessionId: input.data.sessionId || "other-tool-session", messages: toolMessages("running") };
        }

        return {};
      },
      mount: createMount(window, app),
    });
    await tick();
    await tick();

    const remountedFirstCard = window.document.querySelector(".tool-card");
    assert.equal(remountedFirstCard.dataset.collapsed, "true");
    assert.equal(remountedFirstCard.querySelector(".tc-head").getAttribute("aria-expanded"), "false");
    assert.equal(remountedFirstCard.querySelector(".tc-body"), null);
    remountCleanup();
  });
});

test("mounted tool calls label argument availability states", async () => {
  await withWindow(async ({ window }) => {
    const app = window.document.querySelector("pi-app");
    app.piWebSidebar = { getSnapshot: () => ({ activeSessionId: "tool-args-state-session" }) };
    const cleanup = activate({
      app,
      backend: async (method) => {
        if (method === "chatState") {
          return {
            activeSessionId: "tool-args-state-session",
            messages: [{
              id: "a1",
              role: "assistant",
              text: "",
              createdAt: 1,
              toolCalls: [
                { id: "empty", name: "noop", argsStatus: "empty", text: "", status: "ok" },
                { id: "missing", name: "legacy", argsStatus: "unavailable", text: "", status: "ok" },
                { id: "large", name: "edit", args: { _truncated: true }, argsStatus: "truncated", text: "", status: "ok" },
                { id: "omitted", name: "read", argsStatus: "omitted", text: "", status: "ok" },
              ],
            }],
          };
        }

        return {};
      },
      mount: createMount(window, app),
    });

    await tick();
    await tick();

    const cards = [...window.document.querySelectorAll(".tool-card")];
    assert.deepEqual(cards.map((card) => card.querySelector(".tc-args").textContent), [
      "no arguments",
      "arguments unavailable",
      "arguments truncated",
      "arguments omitted",
    ]);

    cards.forEach((card) => card.querySelector(".tc-head").click());
    assert.deepEqual(cards.map((card) => card.querySelector(".tc-body").textContent), [
      "no arguments",
      "arguments unavailable",
      "arguments truncated: too large to display",
      "arguments omitted: response too large",
    ]);
    cleanup();
  });
});

test("mounted terminal spinner respects reduced motion", async () => {
  await withWindow(async ({ window }) => {
    const previousSetInterval = globalThis.setInterval;
    let intervalCount = 0;
    globalThis.setInterval = ((handler, timeout, ...args) => {
      intervalCount += 1;
      return previousSetInterval(handler, timeout, ...args);
    });
    window.matchMedia = (query) => ({
      matches: query === "(prefers-reduced-motion: reduce)",
      media: query,
      addEventListener: () => {},
      removeEventListener: () => {},
    });

    try {
      const app = window.document.querySelector("pi-app");
      app.piWebSidebar = { getSnapshot: () => ({ activeSessionId: "reduced-motion-session" }) };
      const cleanup = activate({
        app,
        backend: async (method) => {
          if (method === "chatState") {
            return {
              activeSessionId: "reduced-motion-session",
              messages: [{
                id: "a1",
                role: "assistant",
                text: "",
                createdAt: 1,
                toolCalls: [{ id: "t1", name: "bash", text: "running", status: "running" }],
              }],
            };
          }

          return {};
        },
        mount: createMount(window, app),
      });

      await tick();
      await tick(200);

      const spinner = window.document.querySelector(".tc-meta .spinner");
      assert.equal(spinner.hasAttribute("data-frame"), false);
      assert.equal(spinner.querySelectorAll("span").length, 6);
      assert.equal(intervalCount, 0);
      cleanup();
    } finally {
      globalThis.setInterval = previousSetInterval;
    }
  });
});

test("mounted empty assistant messages omit pi row", async () => {
  await withWindow(async ({ window }) => {
    const app = window.document.querySelector("pi-app");
    app.piWebSidebar = { getSnapshot: () => ({ activeSessionId: "empty-assistant-session", activeWorkspaceId: "workspace-1" }) };

    const cleanup = activate({
      app,
      backend: async (method) => {
        if (method === "chatState") {
          return {
            activeSessionId: "empty-assistant-session",
            messages: [
              { id: "a1", role: "assistant", text: "   ", createdAt: 1 },
              {
                id: "a2",
                role: "assistant",
                text: "",
                createdAt: 2,
                toolCalls: [{ id: "t1", name: "bash", args: { command: "pwd" }, text: "done", status: "ok" }],
              },
              { id: "a3", role: "assistant", text: "visible", createdAt: 3 },
            ],
          };
        }

        return {};
      },
      mount: createMount(window, app),
    });

    await tick();
    await tick();

    const piMessages = window.document.querySelectorAll('.msg[data-kind="pi"]');
    assert.equal(piMessages.length, 1);
    assert.equal(piMessages[0].textContent, "pi >visible");
    assert.equal(window.document.querySelectorAll(".tool-card").length, 1);
    assert.equal(window.document.querySelector(".tc-name").textContent, "bash");
    cleanup();
  });
});

test("mounted activation follows sidebar new-session DOM event", async () => {
  await withWindow(async ({ window }) => {
    const app = window.document.querySelector("pi-app");

    const cleanup = activate({
      app,
      backend: async (method, input) => {
        if (method === "chatState" && input.data.sessionId === "created-session") {
          return { activeSessionId: "created-session", messages: [{ id: "m1", role: "assistant", text: "created transcript", createdAt: 1 }] };
        }

        return {};
      },
      mount: createMount(window, app),
    });

    app.dispatchEvent(new window.CustomEvent("pi-web-sidebar:session-created", {
      bubbles: true,
      detail: { sessionId: "created-session", workspaceId: "workspace-created" },
    }));
    await tick();
    await tick();

    const store = JSON.parse(window.localStorage.getItem("pi-web-chat.sessions.v1"));
    assert.equal(store.activeSessionId, "created-session");
    assert.equal(app.dataset.activeWorkspaceId, "workspace-created");
    assert.match(window.document.querySelector(".term-inner").textContent, /created transcript/);
    cleanup();
  });
});

test("mounted submit gracefully works without sidebar plugin", async () => {
  await withWindow(async ({ window }) => {
    const app = window.document.querySelector("pi-app");
    const cleanup = activate({
      app,
      backend: async (method, input) => {
        if (method === "startPrompt") {
          return {};
        }

        if (method === "submitPrompt") {
          return {
            activeSessionId: "solo-session",
            messages: [{ id: "u1", role: "user", text: input.data.text, createdAt: 1 }],
          };
        }

        return {};
      },
      mount: createMount(window, app),
    });

    const textarea = window.document.querySelector(".prompt-textarea");
    textarea.value = "solo";
    textarea.dispatchEvent(new window.Event("input", { bubbles: true }));
    window.document.querySelector(".send-btn").click();
    await tick();

    assert.match(window.document.querySelector(".term-inner").textContent, /solo/);
    cleanup();
  });
});

test("mounted prompt triggers shell mode, slash commands, and file refs", async () => {
  await withWindow(async ({ window, backendCalls }) => {
    const app = window.document.querySelector("pi-app");
    const cleanup = activate({
      app,
      backend: async (method, input) => {
        backendCalls.push({ method, input });

        if (method === "commands") {
          return { commands: [{ command: "/review", description: "review files", template: "/review " }] };
        }

        if (method === "searchFiles") {
          return { files: [{ path: "src/index.ts", name: "index.ts", size: 123 }] };
        }

        if (method === "resolveContext") {
          return { attachments: [{ path: "src/index.ts", name: "index.ts", content: "source" }] };
        }

        if (method === "runShell") {
          return { output: "x".repeat(70000), exitCode: 0, durationMs: 5 };
        }

        if (method === "startPrompt") {
          return {};
        }

        if (method === "submitPrompt") {
          return {
            activeSessionId: "trigger-session",
            messages: [{ id: "u1", role: "user", text: input.data.text, createdAt: 1 }],
          };
        }

        return {};
      },
      mount: createMount(window, app),
    });

    const submitted = [];
    globalThis.piWeb.subject("chat.input.submitted").subscribe((event) => submitted.push(event));
    const textarea = window.document.querySelector(".prompt-textarea");
    const promptBar = window.document.querySelector(".prompt-bar");
    const attachButton = window.document.querySelector(".attach-btn");
    const fileInput = window.document.querySelector("[data-file-input]");
    Object.defineProperty(fileInput, "files", {
      configurable: true,
      value: [new window.File(["hello"], "note.txt", { type: "text/plain" })],
    });
    fileInput.dispatchEvent(new window.Event("change", { bubbles: true }));
    await tick();
    assert.match(window.document.querySelector(".attach-chips").textContent, /note\.txt/);

    textarea.value = "!";
    textarea.dispatchEvent(new window.KeyboardEvent("keydown", { key: " ", bubbles: true }));
    assert.equal(promptBar.classList.contains("shell-mode"), true);
    assert.equal(attachButton.disabled, true);
    assert.equal(attachButton.title, "shell command mode");
    assert.notEqual(attachButton.querySelector("[data-material-icon='terminal']"), null);
    assert.equal(textarea.value, "");
    assert.equal(window.document.querySelector(".attach-chips").hidden, true);
    assert.equal(window.document.querySelector(".shell-attachment-note").hidden, false);
    assert.match(window.document.querySelector(".shell-attachment-note").textContent, /queued attachments are hidden/);
    textarea.value = "@README.md";
    textarea.dispatchEvent(new window.Event("input", { bubbles: true }));
    await tick(150);
    assert.equal(window.document.querySelector(".attach-chips").hidden, true);
    assert.equal(window.document.querySelector(".prompt-file-ref-pop").hidden, true);
    textarea.value = "pwd";
    textarea.dispatchEvent(new window.Event("input", { bubbles: true }));
    window.document.querySelector(".send-btn").click();
    await tick();
    assert.ok(backendCalls.some((call) => call.method === "runShell" && call.input.data.command === "pwd"));
    assert.equal(submitted[0].attachments.length, 0);
    assert.match(window.document.querySelector(".term-inner").textContent, /\$ pwd\n/);
    assert.match(window.document.querySelector(".term-inner").textContent, /\[exit 0 · 5ms · truncated\]/);
    assert.ok(window.document.querySelector(".term-inner").textContent.length < 65000);
    assert.equal(promptBar.classList.contains("shell-mode"), false);
    assert.equal(attachButton.disabled, false);
    assert.equal(attachButton.title, "attach files");
    assert.notEqual(attachButton.querySelector("[data-material-icon='attach_file']"), null);
    assert.equal(window.document.querySelector(".shell-attachment-note").hidden, true);
    assert.match(window.document.querySelector(".attach-chips").textContent, /note\.txt/);

    textarea.value = "/";
    textarea.dispatchEvent(new window.Event("input", { bubbles: true }));
    await tick();
    assert.equal(window.document.querySelector(".slash-pop").hidden, false);
    assert.equal(window.document.querySelector(".slash-item").dataset.slash, "/review");
    window.document.querySelector(".slash-item").click();
    assert.equal(textarea.value, "/review ");

    textarea.value = "use @";
    textarea.setSelectionRange(textarea.value.length, textarea.value.length);
    textarea.dispatchEvent(new window.Event("input", { bubbles: true }));
    await tick(150);
    assert.equal(window.document.querySelector(".prompt-file-ref-pop").hidden, false);
    window.document.querySelector(".prompt-file-ref-item").click();
    assert.equal(textarea.value, "use @src/index.ts ");
    assert.match(window.document.querySelector(".attach-chips").textContent, /src\/index\.ts/);

    window.document.querySelector(".send-btn").click();
    await tick();
    const submitCall = backendCalls.find((call) => call.method === "submitPrompt");
    assert.ok(submitCall.input.data.attachments.some((attachment) => attachment.path === "src/index.ts"));
    cleanup();
  });
});

test("mounted attach button sends selected files with prompt", async () => {
  await withWindow(async ({ window, backendCalls }) => {
    const app = window.document.querySelector("pi-app");
    const submitted = [];
    globalThis.piWeb.subject("chat.input.submitted").subscribe((event) => submitted.push(event));
    const cleanup = activate({
      app,
      backend: async (method, input) => {
        backendCalls.push({ method, input });

        if (method === "startPrompt") {
          return {};
        }

        if (method === "submitPrompt") {
          return {
            activeSessionId: "attached-session",
            messages: [{ id: "u1", role: "user", text: input.data.text, createdAt: 1 }],
          };
        }

        return {};
      },
      mount: createMount(window, app),
    });

    const fileInput = window.document.querySelector("[data-file-input]");
    Object.defineProperty(fileInput, "files", {
      configurable: true,
      value: [new window.File(["hello"], "note.txt", { type: "text/plain" })],
    });
    fileInput.dispatchEvent(new window.Event("change", { bubbles: true }));
    await tick();

    const textarea = window.document.querySelector(".prompt-textarea");
    textarea.value = "use attachment";
    textarea.dispatchEvent(new window.Event("input", { bubbles: true }));
    window.document.querySelector(".send-btn").click();
    await tick();

    const submitCall = backendCalls.find((call) => call.method === "submitPrompt");
    const stored = window.localStorage.getItem("pi-web-chat.sessions.v1") || "";

    assert.equal(submitCall.input.data.attachments[0].name, "note.txt");
    assert.equal(submitCall.input.data.attachments[0].content, "hello");
    assert.equal(submitted[0].attachments[0].name, "note.txt");
    assert.equal(submitted[0].attachments[0].content, undefined);
    assert.equal(stored.includes("hello"), false);
    assert.equal(window.document.querySelector(".attach-chips").hidden, true);
    cleanup();
  });
});

test("mounted activation removes stale appended plugin surfaces before remount", async () => {
  await withWindow(async ({ window }) => {
    const app = window.document.querySelector("pi-app");
    const mount = createAppendMount(window);
    const backendCalls = [];

    activate({ app, backend: async () => ({}), mount });
    delete app.piWebChat;
    const cleanup = activate({
      app,
      backend: async (method, input) => {
        backendCalls.push({ method, input });

        if (method === "startPrompt") {
          return {};
        }

        if (method === "submitPrompt") {
          return {
            activeSessionId: input.data.sessionId,
            messages: [{ id: "remount-user", role: "user", text: input.data.text, createdAt: Date.now() }],
          };
        }

        return {};
      },
      mount,
    });

    assert.equal(window.document.querySelectorAll(".pi-web-chat-surface").length, 1);
    assert.equal(window.document.querySelectorAll(".pi-web-chat-composer").length, 1);
    assert.equal(window.document.querySelectorAll(".prompt-textarea").length, 1);

    const textarea = window.document.querySelector(".prompt-textarea");
    textarea.value = "remount prompt";
    textarea.dispatchEvent(new window.Event("input", { bubbles: true }));
    window.document.querySelector(".send-btn").click();
    await tick();
    await tick();

    assert.equal(backendCalls.filter((call) => call.method === "startPrompt").length, 1);
    assert.equal(backendCalls.filter((call) => call.method === "submitPrompt").length, 1);
    assert.equal(window.document.querySelectorAll(".transcript-item").length, 1);
    assert.match(window.document.querySelector(".term-inner").textContent, /remount prompt/);
    cleanup();
  });
});

function createMount(window, app) {
  return {
    chat: (element) => {
      window.document.querySelector("[data-chat-host]").replaceChildren(element);
      return () => element.remove();
    },
    composer: (element) => {
      window.document.querySelector("[data-composer-host]").replaceChildren(element);
      return () => element.remove();
    },
  };
}

function createAppendMount(window) {
  const mountSurface = (selector, attribute, element) => {
    const host = window.document.querySelector("[data-chat-host]");
    const existingRoot = host.querySelector(selector);
    const root = existingRoot || element;

    if (!existingRoot) {
      element.dataset[attribute] = "";
      host.append(element);
    } else {
      existingRoot.append(element);
    }

    return () => {
      element.remove();
      root.hidden = true;
    };
  };

  return {
    chat: (element) => mountSurface("[data-plugin-chat-root]", "pluginChatRoot", element),
    composer: (element) => mountSurface("[data-plugin-composer-root]", "pluginComposerRoot", element),
  };
}

function tick(ms = 0) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

test("mounted sidebar clears handle null channels and stale async results", async () => {
  await withWindow(async ({ window }) => {
    const app = window.document.querySelector("pi-app");
    const selectedSession$ = new BehaviorSubject(null);
    let resolveChatState;
    app.piWebSidebar = {
      channels: { selectedSession$ },
      getSnapshot: () => ({ activeSessionId: "snapshot-session", activeWorkspaceId: "workspace-1" }),
    };

    const cleanup = activate({
      app,
      backend: async (method, input) => {
        if (method === "chatState" && input.data.sessionId === "snapshot-session") {
          await new Promise((resolve) => { resolveChatState = resolve; });
          return { activeSessionId: "snapshot-session", messages: [{ id: "m1", role: "assistant", text: "stale snapshot", createdAt: 1 }] };
        }

        return {};
      },
      mount: createMount(window, app),
    });

    await tick();
    selectedSession$.next(null);
    await tick();
    resolveChatState();
    await tick();
    await tick();

    assert.match(window.document.querySelector(".term-inner").textContent, /pi-web-chat guide/);
    assert.doesNotMatch(window.document.querySelector(".term-inner").textContent, /stale snapshot/);
    cleanup();
  });
});

test("mounted renderer falls back to text when capped blocks are empty", async () => {
  await withWindow(async ({ window }) => {
    const app = window.document.querySelector("pi-app");
    app.piWebSidebar = { getSnapshot: () => ({ activeSessionId: "capped-blocks-session" }) };
    const cleanup = activate({
      app,
      backend: async (method) => method === "chatState" ? {
        activeSessionId: "capped-blocks-session",
        messages: [{
          id: "a1",
          role: "assistant",
          text: "visible fallback",
          createdAt: 1,
          blocks: [
            { id: "b1", type: "thinking", text: "partial thinking" },
            { id: "b2", type: "tool", text: "", toolCall: { id: "t1", name: "read", text: "", argsStatus: "omitted", status: "ok" } },
          ],
        }],
      } : {},
      mount: createMount(window, app),
    });

    await tick();
    await tick();

    assert.match(window.document.querySelector(".term-inner").textContent, /visible fallback/);
    cleanup();
  });
});

test("mounted renderer falls back to full text when block cap is reached", async () => {
  await withWindow(async ({ window }) => {
    const app = window.document.querySelector("pi-app");
    app.piWebSidebar = { getSnapshot: () => ({ activeSessionId: "capped-count-session" }) };
    const blocks = Array.from({ length: 200 }, (_, index) => ({ id: `b${index}`, type: "text", text: `part-${index}` }));
    const cleanup = activate({
      app,
      backend: async (method) => method === "chatState" ? {
        activeSessionId: "capped-count-session",
        messages: [{ id: "a1", role: "assistant", text: "full capped fallback", createdAt: 1, blocks }],
      } : {},
      mount: createMount(window, app),
    });

    await tick();
    await tick();

    const text = window.document.querySelector(".term-inner").textContent;
    assert.match(text, /full capped fallback/);
    assert.doesNotMatch(text, /part-199/);
    cleanup();
  });
});

test("mounted sidebar clears session.activeId null and stale submit results", async () => {
  await withWindow(async ({ window }) => {
    const app = window.document.querySelector("pi-app");
    let resolveStart;

    const cleanup = activate({
      app,
      backend: async (method) => {
        if (method === "startPrompt") {
          await new Promise((resolve) => { resolveStart = resolve; });
          return { activeSessionId: "stale-submit-session" };
        }

        return {};
      },
      mount: createMount(window, app),
    });

    const textarea = window.document.querySelector(".prompt-textarea");
    textarea.value = "stale submit";
    textarea.dispatchEvent(new window.Event("input", { bubbles: true }));
    window.document.querySelector(".send-btn").click();
    await tick();
    globalThis.piWeb.behaviorSubject("session.activeId", null).next(null);
    await tick();
    resolveStart();
    await tick();
    await tick();

    const stored = window.localStorage.getItem("pi-web-chat.sessions.v1") || "";
    assert.match(window.document.querySelector(".term-inner").textContent, /pi-web-chat guide/);
    assert.equal(stored.includes("stale submit"), false);
    cleanup();
  });
});

test("mounted tool aria labels summarize args without full JSON", async () => {
  await withWindow(async ({ window }) => {
    const app = window.document.querySelector("pi-app");
    app.piWebSidebar = { getSnapshot: () => ({ activeSessionId: "aria-session" }) };
    const cleanup = activate({
      app,
      backend: async (method) => method === "chatState" ? {
        activeSessionId: "aria-session",
        messages: [{ id: "a1", role: "assistant", text: "", createdAt: 1, toolCalls: [
          { id: "long", name: "bash", args: { command: "x".repeat(300) }, argsStatus: "present", text: "", status: "ok" },
        ] }],
      } : {},
      mount: createMount(window, app),
    });

    await tick();
    await tick();

    const head = window.document.querySelector(".tc-head");
    assert.equal(head.getAttribute("aria-label"), "Show bash output, done, arguments present");
    assert.match(window.document.querySelector(".tc-args").textContent, /xxx/);
    cleanup();
  });
});

async function withWindow(callback) {
  const window = new Window();
  window.SyntaxError = SyntaxError;
  const previousDocument = globalThis.document;
  const previousLocalStorage = globalThis.localStorage;
  const previousPiWeb = globalThis.piWeb;
  const previousPiWebSidebar = globalThis.piWebSidebar;
  const backendCalls = [];
  globalThis.document = window.document;
  globalThis.localStorage = window.localStorage;
  globalThis.piWeb = createPiWeb();
  globalThis.piWebSidebar = undefined;

  window.document.body.innerHTML = `
    <pi-app data-active-workspace-id="workspace-1">
      <main data-chat-host></main>
      <section data-composer-host></section>
    </pi-app>`;

  try {
    await callback({ window, backendCalls });
  } finally {
    globalThis.document = previousDocument;
    globalThis.localStorage = previousLocalStorage;
    globalThis.piWeb = previousPiWeb;
    globalThis.piWebSidebar = previousPiWebSidebar;
  }
}
