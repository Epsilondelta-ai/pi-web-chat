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

test("channels use pi-web standard names", () => {
  const pi = createPiWeb();
  const channels = createChannels(pi);
  channels.input$.next("hello");
  assert.equal(channels.input$.getValue(), "hello");
  assert.deepEqual(pi.listSubjects().sort(), ["chat.input", "chat.input.submitted", "session.activeId", "toast.requested"].sort());
});

test("active workspace prefers sidebar, session, then dataset", () => {
  assert.equal(getActiveWorkspaceId({ app: { dataset: { activeWorkspaceId: "dataset" } } }), "dataset");
  assert.equal(getActiveWorkspaceId({ app: { dataset: { activeWorkspaceId: "dataset" } }, session: { activeWorkspaceId: () => "session" } }), "session");
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
