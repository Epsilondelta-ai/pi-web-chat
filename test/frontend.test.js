import test from "node:test";
import assert from "node:assert/strict";
import { Window } from "happy-dom";
import { activate, commandName, createState, extractRefs, mergeCommands, backendCall, pluginStyleText } from "../index.js";

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

test("activate mounts surfaces and restores patched app methods", () => {
  const window = new Window();
  const previousDocument = globalThis.document;
  globalThis.document = window.document;

  try {
    const app = window.document.createElement("pi-app");
    app.innerHTML = '<div data-prompt-meta></div>';
    app.dataset.activeWorkspaceId = "w1";
    app.renderSlashCommands = () => "core";
    const mountCalls = [];
    const cleanupCalls = [];

    const cleanup = activate({
      app,
      backend() {
        return Promise.resolve({ commands: [] });
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
    });

    assert.equal(app.classList.contains("pi-web-chat-enhanced"), true);
    assert.deepEqual(mountCalls.map((call) => call[0]), ["chat", "composer"]);
    assert.equal(typeof app.submitPrompt, "function");
    cleanup();
    assert.equal(app.classList.contains("pi-web-chat-enhanced"), false);
    assert.equal(app.renderSlashCommands(), "core");
    assert.equal("submitPrompt" in app, false);
    assert.deepEqual(cleanupCalls.sort(), ["chat", "composer"]);
  } finally {
    globalThis.document = previousDocument;
  }
});
