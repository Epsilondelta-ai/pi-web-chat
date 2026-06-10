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
  extractRefs,
  getActiveWorkspaceId,
  mergeCommands,
  pluginStyleText,
  promptFromAgUiLikeRunInput,
  renderMessages,
} from "../index.js";

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

test("command utilities keep chat command behavior", () => {
  assert.equal(commandName({ command: "/a" }), "/a");
  assert.equal(commandName({ cmd: "/b" }), "/b");
  assert.equal(commandName({ name: "c" }), "/c");
  assert.deepEqual(mergeCommands([{ command: "/a" }], [{ command: "/a" }, { command: "/b" }]).map(commandName), ["/a", "/b"]);
  assert.deepEqual(extractRefs("use @README.md and `@ignored` @src/app.ts @README.md"), ["README.md", "src/app.ts"]);
});

test("plugin styles target mounted chat surfaces", () => {
  const styles = pluginStyleText();
  assert.match(styles, /pi-web-chat-surface/);
  assert.match(styles, /pi-web-chat-composer/);
  assert.match(styles, /prefix\.tool/);
  assert.match(styles, /body\.sys/);
  assert.match(styles, /resize: none/);
  assert.match(styles, /focus-visible/);
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
    cleanup();
  });
});

test("mounted submit streams through SSE and notifies sidebar refresh channel", async () => {
  await withWindow(async ({ window, backendCalls }) => {
    const app = window.document.querySelector("pi-app");
    const submitted = [];
    const encoder = new TextEncoder();
    globalThis.piWeb.subject("chat.input.submitted").subscribe((event) => submitted.push(event));

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
    assert.match(window.document.querySelector(".term-inner").textContent, /final answer|streamed answer/);
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

    const cleanup = activate({
      app,
      backend: async (method) => {
        if (method === "chatState") {
          return {
            activeSessionId: "tool-session",
            messages: [{
              id: "a1",
              role: "assistant",
              text: "used tools",
              createdAt: 1,
              thinking: "**Evaluating git status**\n\nI should inspect the repository before answering.",
              toolCalls: [
                { id: "t1", name: "read", text: "README.md", status: "ok" },
                { id: "t2", name: "bash", args: { command: "git status" }, text: "clean", status: "ok" },
                { id: "t3", name: "unknown_tool", text: "dot", status: "ok" },
                { id: "t4", name: "bash", args: { command: "bun test" }, text: "running", status: "running" },
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
    assert.equal(cards.length, 4);
    assert.equal(cards.slice(0, 3).every((card) => card.dataset.collapsed === "true"), true);
    assert.equal(cards.slice(0, 3).every((card) => card.querySelector(".tc-body") === null), true);
    assert.equal(cards[3].dataset.collapsed, "false");
    assert.equal(cards[3].querySelector(".tc-body").textContent, "running");
    assert.equal(cards[0].querySelector(".tc-head").getAttribute("aria-label"), "Show read output");
    assert.ok(cards[0].querySelector("[data-tool-icon='book-open']"));
    assert.ok(cards[1].querySelector("[data-tool-icon='git-branch']"));
    assert.equal(cards[1].querySelector(".tc-args").textContent, JSON.stringify({ command: "git status" }));
    assert.equal(cards[2].querySelector(".tc-glyph").textContent, "●");
    assert.ok(cards[3].querySelector("[data-tool-icon='circle-check']"));
    assert.equal(cards[3].querySelector(".tc-meta .spinner").textContent, "⠇");
    assert.equal(cards[3].querySelector(".tc-meta .running").textContent, "running");
    assert.equal(cards[3].querySelector(".tc-meta .ok"), null);
    assert.equal(window.document.querySelector(".thinking-block .label").textContent, "THINKING");
    assert.match(window.document.querySelector(".thinking-block .body").textContent, /Evaluating git status/);

    cards[0].querySelector(".tc-head").click();
    assert.equal(cards[0].dataset.collapsed, "false");
    assert.equal(cards[0].querySelector(".tc-head").getAttribute("aria-expanded"), "true");
    assert.equal(cards[0].querySelector(".tc-head").getAttribute("aria-label"), "Hide read output");
    assert.equal(cards[0].querySelector(".tc-body").textContent, "README.md");
    cards[0].querySelector(".tc-head").click();
    assert.equal(cards[0].dataset.collapsed, "true");
    assert.equal(cards[0].querySelector(".tc-head").getAttribute("aria-expanded"), "false");
    assert.equal(cards[0].querySelector(".tc-body"), null);
    cleanup();
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

function tick(ms = 0) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

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
