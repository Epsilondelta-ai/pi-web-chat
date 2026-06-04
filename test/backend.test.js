import { mkdtemp, writeFile, mkdir } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
import test from "node:test";
import assert from "node:assert/strict";
import {
  CHAT_SLASH_COMMANDS,
  extractFileRefs,
  handle,
  isLikelyText,
  readWorkspaceTextFile,
  resolvePromptContext,
  runShellCommand,
  safePath,
  searchWorkspaceFiles,
  isMainModule,
} from "../backend.js";

test("extractFileRefs returns unique prompt refs", () => {
  assert.deepEqual(extractFileRefs("check @src/app.ts and `@ignored` @README.md @src/app.ts"), [
    "src/app.ts",
    "README.md",
  ]);
});

test("safePath rejects path traversal", async () => {
  const root = await mkdtemp(join(tmpdir(), "pi-web-chat-"));
  assert.equal(safePath(root, "a.txt"), join(root, "a.txt"));
  assert.throws(() => safePath(root, "../secret"), /escapes workspace/);
});

test("search, read, and resolve workspace files", async () => {
  const root = await mkdtemp(join(tmpdir(), "pi-web-chat-"));
  await mkdir(join(root, "src"));
  await writeFile(join(root, "README.md"), "hello readme");
  await writeFile(join(root, "src", "app.js"), "console.log('app')");
  await writeFile(join(root, "src", "bin.dat"), Buffer.from([0, 1, 2, 3]));

  const files = await searchWorkspaceFiles(root, "app", 10);
  assert.deepEqual(files, [{ type: "file", name: "app.js", path: "src/app.js" }]);

  const file = await readWorkspaceTextFile(root, "README.md");
  assert.equal(file.content, "hello readme");
  assert.equal(file.mimeType, "text/markdown");
  assert.equal(isLikelyText(Buffer.from([0, 1, 2]), "bin.dat"), false);

  const context = await resolvePromptContext(root, { text: "use @README.md", refs: ["src/app.js"] });
  assert.deepEqual(context.refs, ["src/app.js", "README.md"]);
  assert.equal(context.attachments.length, 2);
});

test("handle dispatches commands and unknown methods", async () => {
  assert.deepEqual(await handle("commands", ".", {}), { commands: CHAT_SLASH_COMMANDS });
  await assert.rejects(() => handle("missing", ".", {}), /unknown method/);
});

test("isMainModule follows symlinked plugin installs", async () => {
  const root = await mkdtemp(join(tmpdir(), "pi-web-chat-"));
  const target = join(root, "backend.js");
  const link = join(root, "linked-backend.js");
  await writeFile(target, "");
  await import("node:fs/promises").then(({ symlink }) => symlink(target, link));

  assert.equal(isMainModule(new URL(target, "file://").href, link), true);
  assert.equal(isMainModule(new URL(target, "file://").href, ""), false);
}
);

test("runShellCommand captures output and exit code", async () => {
  const root = await mkdtemp(join(tmpdir(), "pi-web-chat-"));
  const result = await runShellCommand(root, { command: "printf ok" });
  assert.equal(result.output, "ok");
  assert.equal(result.exitCode, 0);

  const failed = await runShellCommand(root, { command: "exit 7" });
  assert.equal(failed.exitCode, 7);
});
