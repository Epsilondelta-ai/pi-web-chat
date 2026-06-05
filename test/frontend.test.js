import test from "node:test";
import assert from "node:assert/strict";
import { Window } from "happy-dom";
import { activate, commandName, createState, extractRefs, mergeCommands, backendCall, getActiveWorkspaceId, pluginStyleText } from "../index.js";

test("commandName normalizes command shapes", () => {
  assert.equal(commandName({ command: "/x" }), "/x");
  assert.equal(commandName({ cmd: "/y" }), "/y");
  assert.equal(commandName({ name: "z" }), "/z");
  assert.equal(commandName({}), "");
});

test("mergeCommands deduplicates core and plugin commands", () => {
  const merged = mergeCommands([{ command: "/a" }, { command: "/b" }], [{ command: "/b" }, { command: "/c" }]);
  assert.deepEqual(merged.map(commandName), ["/a", "/b", "/c"]);
});

test("extractRefs parses unique @ refs", () => {
  assert.deepEqual(extractRefs("@a.ts then @dir/b.md and @a.ts"), ["a.ts", "dir/b.md"]);
});

test("plugin chat surface keeps grid placement on mobile", () => {
  const styles = pluginStyleText();
  assert.match(styles, /\.pi-web-chat-surface \{ display: flex; flex-direction: column; \}/);
  assert.doesNotMatch(styles, /\.pi-web-chat-surface \{ display: contents; \}/);
});

test("backendCall wraps workspaceId and data", async () => {
  const calls = [];
  const state = createState({
    app: { dataset: { activeWorkspaceId: "w1" } },
    backend(method, body) {
      calls.push([method, body]);
      return Promise.resolve({ ok: true });
    },
  });
  assert.deepEqual(await backendCall(state, "commands", { reload: true }), { ok: true });
  assert.deepEqual(calls, [["commands", { workspaceId: "w1", data: { reload: true } }]]);
});

test("active workspace prefers sidebar snapshot and falls back to session and dataset", () => {
  assert.equal(
    getActiveWorkspaceId(createState({
      app: {
        dataset: { activeWorkspaceId: "dataset-workspace" },
        piWebSidebar: { getSnapshot: () => ({ activeWorkspaceId: "sidebar-workspace" }) },
      },
      session: { activeWorkspaceId: () => "session-workspace" },
      backend() {
        return Promise.resolve({});
      },
    })),
    "sidebar-workspace",
  );

  assert.equal(
    getActiveWorkspaceId(createState({
      app: { dataset: { activeWorkspaceId: "dataset-workspace" } },
      session: { activeWorkspaceId: () => "session-workspace" },
      backend() {
        return Promise.resolve({});
      },
    })),
    "session-workspace",
  );

  assert.equal(
    getActiveWorkspaceId(createState({
      app: { dataset: { activeWorkspaceId: "dataset-workspace" } },
      backend() {
        return Promise.resolve({});
      },
    })),
    "dataset-workspace",
  );
});

test("activate mounts surfaces and restores patched app methods", () => {
  withPlugin(({ app, cleanup, cleanupCalls, mountCalls }) => {
    app.renderSlashCommands = () => "core";
    cleanup.activate();
    assert.equal(app.classList.contains("pi-web-chat-enhanced"), true);
    assert.deepEqual(mountCalls.map((call) => call[0]), ["chat", "composer"]);
    assert.equal(typeof app.submitPrompt, "function");
    cleanup.run();
    assert.equal(app.classList.contains("pi-web-chat-enhanced"), false);
    assert.equal(app.renderSlashCommands(), "core");
    assert.equal("pickSlash" in app, false);
    assert.deepEqual(cleanupCalls.sort(), ["chat", "composer"]);
  });
});

test("patched file refs search and attach before submit", async () => {
  await withPlugin(async ({ app, backendCalls, cleanup }) => {
    const chips = [];
    let renderedFiles = [];
    let originalSubmitCalled = false;
    app.prompt = document.createElement("textarea");
    app.prompt.value = "check @README.md";
    app.attachments = document.createElement("div");
    app.currentPromptFileRef = () => ({ query: "REA" });
    app.renderPromptFileRefs = (files) => {
      renderedFiles = files;
    };
    app.addAttachmentChip = (name, size) => {
      chips.push([name, size]);
    };
    app.submitPrompt = () => {
      originalSubmitCalled = true;
    };
    cleanup.activate();
    app.updatePromptFileRefs("@REA");
    await new Promise((resolve) => setTimeout(resolve, 0));
    assert.deepEqual(renderedFiles, [{ path: "README.md" }]);
    await app.submitPrompt();
    assert.equal(originalSubmitCalled, true);
    assert.deepEqual(chips, [["README.md", 5]]);
    assert.deepEqual(backendCalls.map((call) => call[0]).filter((method) => method !== "commands"), ["searchFiles", "resolveContext"]);
    cleanup.run();
  });
});

test("patched shell command renders backend tool result", async () => {
  await withPlugin(async ({ app, backendCalls, cleanup }) => {
    const finishedTools = [];
    const hookCalls = [];
    app.apiConnected = true;
    app.finishTool = (message) => {
      finishedTools.push(message);
    };
    cleanup.activate();
    await app.runPromptShellCommand("printf ok", {
      onStart: () => hookCalls.push("start"),
      onSuccess: () => hookCalls.push("success"),
      onFinish: () => hookCalls.push("finish"),
    });
    assert.deepEqual(hookCalls, ["start", "success", "finish"]);
    assert.equal(finishedTools.at(-1).body, "ok");
    assert.deepEqual(backendCalls.map((call) => call[0]).filter((method) => method !== "commands"), ["runShell"]);
    cleanup.run();
  });
});

async function withPlugin(callback) {
  const window = new Window();
  const previousDocument = globalThis.document;
  globalThis.document = window.document;

  try {
    const app = window.document.createElement("pi-app");
    app.innerHTML = '<div data-prompt-meta></div>';
    app.dataset.activeWorkspaceId = "w1";
    const backendCalls = [];
    const cleanupCalls = [];
    const mountCalls = [];
    let deactivate = () => {};
    const cleanup = {
      activate() {
        deactivate = activate(createContext(app, backendCalls, mountCalls, cleanupCalls));
      },
      run() {
        deactivate();
      },
    };
    await callback({ app, backendCalls, cleanup, cleanupCalls, mountCalls });
  } finally {
    globalThis.document = previousDocument;
  }
}

function createContext(app, backendCalls, mountCalls, cleanupCalls) {
  return {
    app,
    backend(method, body) {
      backendCalls.push([method, body]);

      if (method === "commands") {
        return Promise.resolve({ commands: [] });
      }

      if (method === "searchFiles") {
        return Promise.resolve({ files: [{ path: "README.md" }] });
      }

      if (method === "resolveContext") {
        return Promise.resolve({ attachments: [{ name: "README.md", content: "hello" }] });
      }

      if (method === "runShell") {
        return Promise.resolve({ exitCode: 0, output: "ok", durationMs: 3 });
      }

      return Promise.resolve({});
    },
    mount: {
      chat(element, options) {
        mountCalls.push(["chat", element.className, options]);
        return () => cleanupCalls.push("chat");
      },
      composer(element, options) {
        mountCalls.push(["composer", element.className, options]);
        return () => cleanupCalls.push("composer");
      },
    },
  };
}
