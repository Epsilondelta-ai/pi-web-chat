import test from "node:test";
import assert from "node:assert/strict";
import { Window } from "happy-dom";
import { AsyncSubject, BehaviorSubject, ReplaySubject, Subject } from "rxjs";
import activate, { backendCall, commandName, createChannels, extractRefs, getActiveWorkspaceId, mergeCommands, pluginStyleText } from "../index.js";

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

test("command utilities keep chat command behavior", () => {
  assert.equal(commandName({ command: "/a" }), "/a");
  assert.equal(commandName({ cmd: "/b" }), "/b");
  assert.equal(commandName({ name: "c" }), "/c");
  assert.deepEqual(mergeCommands([{ command: "/a" }], [{ command: "/a" }, { command: "/b" }]).map(commandName), ["/a", "/b"]);
  assert.deepEqual(extractRefs("use @README.md and `@ignored` @src/app.ts @README.md"), ["README.md", "src/app.ts"]);
});

test("plugin styles target plugin-owned DOM", () => {
  const styles = pluginStyleText();
  assert.match(styles, /pi-web-chat-root/);
  assert.match(styles, /pi-web-chat-transcript/);
});

test("plugin styles restore legacy mounted slash popover", () => {
  const styles = pluginStyleText();
  assert.match(styles, /\.pi-web-chat-enhanced \.slash-pop \{/);
  assert.match(styles, /bottom: calc\(100% \+ 4px\)/);
  assert.match(styles, /\.pi-web-chat-enhanced \.slash-item \{/);
  assert.match(styles, /grid-template-columns: minmax\(120px, \.8fr\) auto minmax\(0, 1\.4fr\)/);
  assert.match(styles, /\.app-body:has\(\.sidebar-wrap\) > \[data-plugin-composer-root\]/);
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
  assert.equal(getActiveWorkspaceId({ app: { dataset: { activeWorkspaceId: "dataset" } }, session: { activeWorkspaceId: () => "session" } }), "dataset");
  assert.equal(
    getActiveWorkspaceId({
      app: { dataset: { activeWorkspaceId: "dataset" }, piWebSidebar: { getSnapshot: () => ({ activeWorkspaceId: "sidebar" }) } },
      session: { activeWorkspaceId: () => "session" },
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

test("initializes from pi-web-sidebar selected session localStorage", async () => {
  await withWindow(async ({ window }) => {
    window.localStorage.setItem("plugin.pi-web-sidebar.activeSessionId", "sidebar-session");
    const cleanup = activate({
      app: window.document.querySelector("pi-app"),
      backend: async (method) => (method === "commands" ? { commands: [] } : {}),
    });
    await tick();

    const store = JSON.parse(window.localStorage.getItem("pi-web-chat.sessions.v1"));
    assert.equal(store.activeSessionId, "sidebar-session");
    assert.equal(store.sessions[0].id, "sidebar-session");
    cleanup();
  });
});

test("loads sessions selected by pi-web-sidebar channel", async () => {
  await withWindow(async ({ window }) => {
    const cleanup = activate({
      app: window.document.querySelector("pi-app"),
      backend: async (method) => (method === "commands" ? { commands: [] } : {}),
    });

    globalThis.piWeb.behaviorSubject("plugin.pi-web-sidebar.selectedSession", null).next({ sessionId: "selected-by-sidebar", workspaceId: "workspace-1" });
    await tick();

    const store = JSON.parse(window.localStorage.getItem("pi-web-chat.sessions.v1"));
    assert.equal(store.activeSessionId, "selected-by-sidebar");
    assert.ok(store.sessions.some((session) => session.id === "selected-by-sidebar"));
    cleanup();
  });
});

test("initial backend chat state adopts backend session id", async () => {
  await withWindow(async ({ window }) => {
    const cleanup = activate({
      app: window.document.querySelector("pi-app"),
      backend: async (method) => {
        if (method === "commands") return { commands: [] };
        if (method === "chatState") return { activeSessionId: "pi-session", messages: [{ id: "backend-1", role: "assistant", text: "from backend", createdAt: 2 }] };
        return {};
      },
    });
    await tick();
    await tick();

    const store = JSON.parse(window.localStorage.getItem("pi-web-chat.sessions.v1"));
    assert.equal(store.activeSessionId, "pi-session");
    assert.equal(store.sessions[0].id, "pi-session");
    assert.equal(store.sessions[0].messages[0].text, "from backend");
    cleanup();
  });
});

test("backend chat state reconciles without replacing local active messages", async () => {
  await withWindow(async ({ window }) => {
    let releaseChatState;
    const chatStateReady = new Promise((resolve) => { releaseChatState = resolve; });
    const cleanup = activate({
      app: window.document.querySelector("pi-app"),
      backend: async (method) => {
        if (method === "commands") return { commands: [] };
        if (method === "chatState") {
          await chatStateReady;
          return { activeSessionId: "pi-session", messages: [{ id: "backend-1", role: "assistant", text: "from backend", createdAt: 2 }] };
        }
        return {};
      },
    });

    const root = window.document.querySelector(".pi-web-chat-root");
    const textarea = root.querySelector("[data-chat-input]");
    textarea.value = "local draft";
    textarea.dispatchEvent(new window.Event("input", { bubbles: true }));
    root.querySelector("[data-send]").click();
    releaseChatState();
    await tick();
    await tick();

    const store = JSON.parse(window.localStorage.getItem("pi-web-chat.sessions.v1"));
    assert.ok(store.sessions.some((session) => session.messages.some((message) => message.text === "local draft")));
    assert.ok(store.sessions.some((session) => session.id === "pi-session" && session.messages.some((message) => message.text === "from backend")));
    cleanup();
  });
});

test("mounted pi-web integration uses legacy surfaces without requiring subject registry", async () => {
  await withWindow(async ({ window }) => {
    const app = window.document.querySelector("pi-app");
    const previousPiWeb = globalThis.piWeb;
    const backendCalls = [];
    globalThis.piWeb = undefined;
    const cleanup = activate({
      app,
      backend: async (method, input) => {
        backendCalls.push({ method, input });
        if (method === "submitPrompt") return { activeSessionId: "plugin-session", messages: [{ id: "u1", role: "user", text: input.data.text, createdAt: 1 }] };
        return {};
      },
      mount: {
        chat: (element) => {
          window.document.querySelector("[data-main]").replaceWith(element);
          return () => element.remove();
        },
        composer: (element) => {
          app.append(element);
          return () => element.remove();
        },
      },
      composer: {
        setPrompt: () => { throw new Error("pi-web composer API must not be used"); },
        submitPrompt: async () => { throw new Error("pi-web composer API must not be used"); },
      },
    });

    assert.ok(window.document.querySelector(".pi-web-chat-surface .term-inner"));
    assert.ok(window.document.querySelector(".prompt-region.pi-web-chat-composer .prompt-bar"));
    assert.ok(app.classList.contains("pi-web-chat-enhanced"));
    assert.equal(window.document.querySelector(".pi-web-chat-root"), null);

    const textarea = window.document.querySelector(".prompt-textarea");
    textarea.value = "send to pi";
    textarea.dispatchEvent(new window.Event("input", { bubbles: true }));
    window.document.querySelector(".send-btn").click();
    await tick();
    assert.deepEqual(backendCalls.map((call) => call.method), ["chatState", "submitPrompt"]);
    assert.equal(backendCalls[1].input.data.text, "send to pi");
    assert.match(window.document.querySelector(".term-inner").textContent, /send to pi/);
    assert.equal(textarea.value, "");
    assert.equal(window.document.querySelector(".send-btn").getAttribute("aria-disabled"), "true");

    cleanup();
    assert.equal(window.document.querySelector(".pi-web-chat-surface"), null);
    assert.equal(window.document.querySelector(".prompt-region.pi-web-chat-composer"), null);
    assert.equal(app.classList.contains("pi-web-chat-enhanced"), false);
    globalThis.piWeb = previousPiWeb;
  });
});

test("mounted pi-web integration restores localStorage-backed messages on first load", async () => {
  await withWindow(async ({ window }) => {
    const app = window.document.querySelector("pi-app");
    const previousPiWeb = globalThis.piWeb;
    globalThis.piWeb = undefined;
    window.localStorage.setItem("pi-web-chat.sessions.v1", JSON.stringify({
      activeSessionId: "stored-session",
      sessions: [{ id: "stored-session", title: "Stored", createdAt: 1, updatedAt: 2, messages: [{ id: "m1", role: "assistant", text: "stored history", createdAt: 2 }] }],
    }));

    const cleanup = activate({
      app,
      backend: async () => ({}),
      mount: {
        chat: (element) => {
          window.document.querySelector("[data-main]").replaceWith(element);
          return () => element.remove();
        },
        composer: (element) => {
          app.append(element);
          return () => element.remove();
        },
      },
    });

    assert.match(window.document.querySelector(".term-inner").textContent, /stored history/);
    cleanup();
    globalThis.piWeb = previousPiWeb;
  });
});

test("mounted pi-web integration persists plugin backend session responses", async () => {
  await withWindow(async ({ window }) => {
    const app = window.document.querySelector("pi-app");
    const previousPiWeb = globalThis.piWeb;
    globalThis.piWeb = undefined;
    const cleanup = activate({
      app,
      backend: async (method, input) => {
        if (method === "submitPrompt") return { activeSessionId: "persisted-session", messages: [{ id: "u1", role: "user", text: input.data.text, createdAt: 1 }] };
        return {};
      },
      mount: {
        chat: (element) => {
          window.document.querySelector("[data-main]").replaceWith(element);
          return () => element.remove();
        },
        composer: (element) => {
          app.append(element);
          return () => element.remove();
        },
      },
    });

    const textarea = window.document.querySelector(".prompt-textarea");
    textarea.value = "persist me";
    textarea.dispatchEvent(new window.Event("input", { bubbles: true }));
    window.document.querySelector(".send-btn").click();
    await tick();

    const store = JSON.parse(window.localStorage.getItem("pi-web-chat.sessions.v1"));
    assert.equal(store.activeSessionId, "persisted-session");
    assert.equal(store.sessions[0].messages[0].text, "persist me");
    cleanup();
    globalThis.piWeb = previousPiWeb;
  });
});

test("mounted pi-web integration polls backend chat state while prompt is running", async () => {
  await withWindow(async ({ window }) => {
    const app = window.document.querySelector("pi-app");
    const previousPiWeb = globalThis.piWeb;
    let submitStarted = false;
    let releaseSubmit;
    const submitDone = new Promise((resolve) => { releaseSubmit = resolve; });
    globalThis.piWeb = undefined;
    const cleanup = activate({
      app,
      backend: async (method, input) => {
        if (method === "chatState") {
          return submitStarted ? { activeSessionId: "poll-session", messages: [{ id: "r1", role: "assistant", text: "running update", createdAt: 1 }] } : {};
        }
        if (method === "submitPrompt") {
          submitStarted = true;
          await submitDone;
          return { activeSessionId: "poll-session", messages: [{ id: "u1", role: "user", text: input.data.text, createdAt: 1 }, { id: "a1", role: "assistant", text: "final update", createdAt: 2 }] };
        }
        return {};
      },
      mount: {
        chat: (element) => {
          window.document.querySelector("[data-main]").replaceWith(element);
          return () => element.remove();
        },
        composer: (element) => {
          app.append(element);
          return () => element.remove();
        },
      },
    });

    const textarea = window.document.querySelector(".prompt-textarea");
    textarea.value = "poll me";
    textarea.dispatchEvent(new window.Event("input", { bubbles: true }));
    window.document.querySelector(".send-btn").click();
    await new Promise((resolve) => setTimeout(resolve, 350));
    assert.match(window.document.querySelector(".term-inner").textContent, /running update/);
    releaseSubmit();
    await tick();
    assert.match(window.document.querySelector(".term-inner").textContent, /final update/);
    cleanup();
    globalThis.piWeb = previousPiWeb;
  });
});

test("mounted pi-web integration uses plugin backend when composer submit is unavailable", async () => {
  await withWindow(async ({ window }) => {
    const app = window.document.querySelector("pi-app");
    const previousPiWeb = globalThis.piWeb;
    const hostPrompt = window.document.createElement("textarea");
    const backendCalls = [];
    globalThis.piWeb = undefined;
    app.prompt = hostPrompt;
    app.submitPrompt = async function submitPrompt() { throw new Error("pi-web app API must not be used"); };

    const cleanup = activate({
      app,
      backend: async (method, input) => {
        backendCalls.push({ method, input });
        if (method === "submitPrompt") return { activeSessionId: "plugin-session", messages: [{ id: "u1", role: "user", text: input.data.text, createdAt: 1 }] };
        return {};
      },
      mount: {
        chat: (element) => {
          window.document.querySelector("[data-main]").replaceWith(element);
          return () => element.remove();
        },
        composer: (element) => {
          app.append(element);
          return () => element.remove();
        },
      },
      composer: {
        setPrompt: () => { throw new Error("pi-web composer API must not be used"); },
      },
    });

    assert.ok(window.document.querySelector(".pi-web-chat-surface .term-inner"));
    assert.equal(window.document.querySelector(".pi-web-chat-root"), null);

    const textarea = window.document.querySelector(".prompt-textarea");
    textarea.value = "send via app";
    textarea.dispatchEvent(new window.Event("input", { bubbles: true }));
    window.document.querySelector(".send-btn").click();
    await tick();

    assert.deepEqual(backendCalls.map((call) => call.method), ["chatState", "submitPrompt"]);
    assert.equal(backendCalls[1].input.data.text, "send via app");
    assert.equal(hostPrompt.value, "");
    assert.equal(textarea.value, "");
    assert.equal(window.document.querySelector(".send-btn").getAttribute("aria-disabled"), "true");
    cleanup();
    globalThis.piWeb = previousPiWeb;
  });
});

test("activate appends DOM hooks, publishes submits, and cleans up", async () => {
  await withWindow(async ({ window, backendCalls }) => {
    const cleanup = activate({
      app: window.document.querySelector("pi-app"),
      backend: async (method, input) => {
        backendCalls.push({ method, input });
        if (method === "commands") return { commands: [{ command: "/hello", template: "hello" }] };
        return {};
      },
    });

    const root = window.document.querySelector(".pi-web-chat-root");
    assert.ok(root);
    assert.ok(window.document.querySelector("[data-plugin-toolbar] .pi-web-chat-toolbar-button"));
    assert.ok(window.document.querySelector("[data-plugin-settings-root] .pi-web-chat-settings"));

    const submitted = [];
    globalThis.piWeb.subject("chat.input.submitted").subscribe((event) => submitted.push(event));
    const textarea = root.querySelector("[data-chat-input]");
    textarea.value = "hello world";
    textarea.dispatchEvent(new window.Event("input", { bubbles: true }));
    root.querySelector("[data-send]").click();
    await Promise.resolve();

    assert.equal(submitted[0].text, "hello world");
    assert.match(root.querySelector("[data-chat-transcript]").textContent, /hello world/);
    assert.ok(backendCalls.some((call) => call.method === "commands"));

    cleanup();
    assert.equal(window.document.querySelector(".pi-web-chat-root"), null);
    assert.equal(window.document.querySelector("#pi-web-chat-style"), null);
  });
});

test("slash commands and file refs are plugin-owned, not app patches", async () => {
  await withWindow(async ({ window }) => {
    const backendCalls = [];
    const cleanup = activate({
      app: window.document.querySelector("pi-app"),
      backend: async (method, input) => {
        backendCalls.push({ method, input });
        if (method === "commands") return { commands: [{ command: "/fix", template: "fix it" }] };
        if (method === "searchFiles") return { files: [{ path: "README.md" }] };
        if (method === "resolveContext") return { attachments: [{ path: "README.md", name: "README.md", content: "docs", size: 4 }] };
        return {};
      },
    });

    const root = window.document.querySelector(".pi-web-chat-root");
    const textarea = root.querySelector("[data-chat-input]");

    textarea.value = "/";
    textarea.dispatchEvent(new window.Event("input", { bubbles: true }));
    await tick();
    await tick();
    assert.equal(root.querySelector("[data-slash-popover]").hidden, false);
    root.querySelector("[data-slash-list] button").click();
    assert.equal(textarea.value, "fix it");

    textarea.value = "read @REA";
    textarea.dispatchEvent(new window.Event("input", { bubbles: true }));
    await tick();
    await tick();
    assert.equal(root.querySelector("[data-refs-popover]").hidden, false);
    root.querySelector("[data-refs-list] button").click();
    assert.match(root.querySelector("[data-attachments]").textContent, /README.md/);
    root.querySelector("[data-send]").click();
    await tick();
    const resolveCall = backendCalls.find((call) => call.method === "resolveContext");
    assert.ok(resolveCall.input.data.refs.includes("README.md"));

    cleanup();
  });
});

test("draft, slash visibility, and trigger modes are restored", async () => {
  await withWindow(async ({ window }) => {
    window.localStorage.setItem("pi-web-chat.draft.v1", "saved prompt");
    const cleanup = activate({
      app: window.document.querySelector("pi-app"),
      backend: async (method) => (method === "commands" ? { commands: [{ command: "/fix" }, { command: "/review" }] } : {}),
    });

    const root = window.document.querySelector(".pi-web-chat-root");
    const textarea = root.querySelector("[data-chat-input]");
    assert.equal(textarea.value, "saved prompt");

    textarea.value = "/fi";
    textarea.dispatchEvent(new window.Event("input", { bubbles: true }));
    await tick();
    assert.equal(root.querySelector("[data-slash-popover]").hidden, false);
    assert.equal(root.querySelector("[data-slash-list]").textContent, "/fix");

    textarea.value = "/fix now";
    textarea.dispatchEvent(new window.Event("input", { bubbles: true }));
    await tick();
    assert.equal(root.querySelector("[data-slash-popover]").hidden, true);

    textarea.value = "!ls";
    textarea.dispatchEvent(new window.Event("input", { bubbles: true }));
    assert.equal(root.dataset.composerMode, "shell");
    assert.match(root.querySelector("[data-attach]").innerHTML, /terminal/);
    assert.ok(window.localStorage.getItem("pi-web-chat.draft.v1"));

    root.querySelector("[data-send]").click();
    await tick();
    assert.equal(window.localStorage.getItem("pi-web-chat.draft.v1"), null);
    cleanup();
  });
});

test("file reference popover ignores stale backend results", async () => {
  await withWindow(async ({ window }) => {
    let resolveSearch;
    const searchDone = new Promise((resolve) => { resolveSearch = resolve; });
    const cleanup = activate({
      app: window.document.querySelector("pi-app"),
      backend: async (method) => {
        if (method === "commands") return { commands: [] };
        if (method === "searchFiles") {
          await searchDone;
          return { files: [{ path: "README.md" }] };
        }
        return {};
      },
    });

    const root = window.document.querySelector(".pi-web-chat-root");
    const textarea = root.querySelector("[data-chat-input]");
    textarea.value = "read @REA";
    textarea.dispatchEvent(new window.Event("input", { bubbles: true }));
    await tick();
    textarea.value = "read ";
    textarea.dispatchEvent(new window.Event("input", { bubbles: true }));
    resolveSearch();
    await tick();
    await tick();
    assert.equal(root.querySelector("[data-refs-popover]").hidden, true);
    cleanup();
  });
});

test("local file attachments are included on submit", async () => {
  await withWindow(async ({ window }) => {
    const cleanup = activate({
      app: window.document.querySelector("pi-app"),
      backend: async (method) => (method === "commands" ? { commands: [] } : {}),
    });

    const root = window.document.querySelector(".pi-web-chat-root");
    const submitted = [];
    globalThis.piWeb.subject("chat.input.submitted").subscribe((event) => submitted.push(event));
    const fileInput = root.querySelector("[data-file-input]");
    Object.defineProperty(fileInput, "files", { configurable: true, value: [new window.File(["hello"], "note.txt", { type: "text/plain" })] });
    fileInput.dispatchEvent(new window.Event("change", { bubbles: true }));
    await tick();

    const textarea = root.querySelector("[data-chat-input]");
    textarea.value = "attach this";
    textarea.dispatchEvent(new window.Event("input", { bubbles: true }));
    root.querySelector("[data-send]").click();
    await tick();

    assert.equal(submitted[0].attachments[0].name, "note.txt");
    assert.equal(submitted[0].attachments[0].content, "hello");
    const store = JSON.parse(window.localStorage.getItem("pi-web-chat.sessions.v1"));
    assert.equal(store.sessions[0].messages[0].attachments[0].name, "note.txt");
    assert.equal("content" in store.sessions[0].messages[0].attachments[0], false);
    cleanup();
  });
});

test("local session persistence is capped", async () => {
  await withWindow(async ({ window }) => {
    const cleanup = activate({
      app: window.document.querySelector("pi-app"),
      backend: async (method) => (method === "commands" ? { commands: [] } : {}),
    });

    const root = window.document.querySelector(".pi-web-chat-root");
    const textarea = root.querySelector("[data-chat-input]");
    for (let i = 0; i < 205; i += 1) {
      textarea.value = `message ${i}`;
      textarea.dispatchEvent(new window.Event("input", { bubbles: true }));
      root.querySelector("[data-send]").click();
    }
    await tick();

    const store = JSON.parse(window.localStorage.getItem("pi-web-chat.sessions.v1"));
    assert.equal(store.sessions.length, 1);
    assert.equal(store.sessions[0].messages.length, 200);
    assert.equal(store.sessions[0].messages[0].text, "message 5");
    cleanup();
  });
});

test("shell submit clears pending local attachments", async () => {
  await withWindow(async ({ window }) => {
    const cleanup = activate({
      app: window.document.querySelector("pi-app"),
      backend: async (method) => {
        if (method === "commands") return { commands: [] };
        if (method === "runShell") return { output: "ok\n", exitCode: 0, durationMs: 3 };
        return {};
      },
    });

    const root = window.document.querySelector(".pi-web-chat-root");
    const fileInput = root.querySelector("[data-file-input]");
    Object.defineProperty(fileInput, "files", { configurable: true, value: [new window.File(["secret"], "secret.txt", { type: "text/plain" })] });
    fileInput.dispatchEvent(new window.Event("change", { bubbles: true }));
    await tick();
    assert.match(root.querySelector("[data-attachments]").textContent, /secret.txt/);

    const textarea = root.querySelector("[data-chat-input]");
    textarea.value = "!printf ok";
    textarea.dispatchEvent(new window.Event("input", { bubbles: true }));
    root.querySelector("[data-send]").click();
    await tick();
    await tick();
    assert.equal(root.querySelector("[data-attachments]").textContent, "");

    textarea.value = "normal message";
    textarea.dispatchEvent(new window.Event("input", { bubbles: true }));
    root.querySelector("[data-send]").click();
    await tick();
    const store = JSON.parse(window.localStorage.getItem("pi-web-chat.sessions.v1"));
    const normal = store.sessions[0].messages.find((message) => message.text === "normal message");
    assert.equal(normal.attachments, undefined);
    cleanup();
  });
});

test("shell submit renders backend tool result", async () => {
  await withWindow(async ({ window }) => {
    const cleanup = activate({
      app: window.document.querySelector("pi-app"),
      backend: async (method) => {
        if (method === "commands") return { commands: [] };
        if (method === "runShell") return { output: "ok\n", exitCode: 0, durationMs: 3 };
        return {};
      },
    });

    const root = window.document.querySelector(".pi-web-chat-root");
    const textarea = root.querySelector("[data-chat-input]");
    textarea.value = "!printf ok";
    textarea.dispatchEvent(new window.Event("input", { bubbles: true }));
    root.querySelector("[data-send]").click();
    await tick();
    await tick();

    assert.match(root.querySelector("[data-chat-transcript]").textContent, /\$ printf ok/);
    assert.match(root.querySelector("[data-chat-transcript]").textContent, /\[exit 0 · 3ms\]/);
    cleanup();
  });
});

function tick() {
  return new Promise((resolve) => setTimeout(resolve, 0));
}

async function withWindow(callback) {
  const window = new Window();
  window.SyntaxError = SyntaxError;
  const previousDocument = globalThis.document;
  const previousLocalStorage = globalThis.localStorage;
  const previousPiWeb = globalThis.piWeb;
  const backendCalls = [];
  globalThis.document = window.document;
  globalThis.localStorage = window.localStorage;
  globalThis.piWeb = createPiWeb();

  window.document.body.innerHTML = `
    <pi-app data-active-workspace-id="workspace-1">
      <header><div data-plugin-toolbar></div></header>
      <main class="main" data-main></main>
      <div data-plugin-settings-root></div>
    </pi-app>`;

  try {
    await callback({ window, backendCalls });
  } finally {
    globalThis.document = previousDocument;
    globalThis.localStorage = previousLocalStorage;
    globalThis.piWeb = previousPiWeb;
  }
}
