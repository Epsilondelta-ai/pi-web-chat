import test from "node:test";
import assert from "node:assert/strict";
import { commandName, createState, extractRefs, mergeCommands, backendCall } from "../index.js";

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
