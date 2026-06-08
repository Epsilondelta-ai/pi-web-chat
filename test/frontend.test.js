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

test("mounted submit gracefully works without sidebar plugin", async () => {
  await withWindow(async ({ window }) => {
    const app = window.document.querySelector("pi-app");
    const cleanup = activate({
      app,
      backend: async (method, input) => {
        if (method === "submitPrompt") {
          return { activeSessionId: "solo-session", messages: [{ id: "u1", role: "user", text: input.data.text, createdAt: 1 }] };
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

function tick() {
  return new Promise((resolve) => setTimeout(resolve, 0));
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
