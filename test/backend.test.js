import { mkdtemp, writeFile, mkdir, symlink } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { spawn } from "node:child_process";
import test from "node:test";
import assert from "node:assert/strict";

const backend = new URL("../backend.js", import.meta.url).pathname;

function runBackend(script, method, workspaceRoot, data = {}, env = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [script, method, workspaceRoot], { stdio: ["pipe", "pipe", "pipe"], env: { ...process.env, ...env } });
    let stdout = "";
    let stderr = "";
    child.stdout.on("data", (chunk) => (stdout += chunk));
    child.stderr.on("data", (chunk) => (stderr += chunk));
    child.on("error", reject);
    child.on("close", (code) => resolve({ code, stdout, stderr }));
    child.stdin.end(JSON.stringify(data));
  });
}

async function callBackend(method, workspaceRoot, data = {}, env = {}) {
  const result = await runBackend(backend, method, workspaceRoot, data, env);
  assert.equal(result.code, 0, result.stderr);
  return JSON.parse(result.stdout);
}

async function rejectBackend(method, workspaceRoot, data = {}) {
  const result = await runBackend(backend, method, workspaceRoot, data);
  assert.equal(result.code, 1);
  assert.ok(result.stderr.trim());
}

test("commands returns chat and discovered slash commands", async () => {
  const result = await callBackend("commands", ".");
  const names = result.commands.map((item) => item.command);
  assert.ok(names.includes("/chat-help"));
  assert.ok(names.includes("/chat-context"));
  assert.ok(names.includes("/chat-review"));
  assert.equal(new Set(names).size, names.length);
});

test("readFile rejects path traversal", async () => {
  const root = await mkdtemp(join(tmpdir(), "pi-web-chat-"));
  await rejectBackend("readFile", root, { path: "../secret" });
});

test("search, read, and resolve workspace files", async () => {
  const root = await mkdtemp(join(tmpdir(), "pi-web-chat-"));
  await mkdir(join(root, "src"));
  await writeFile(join(root, "README.md"), "hello readme");
  await writeFile(join(root, "src", "app.js"), "console.log('app')");
  await writeFile(join(root, "src", "bin.dat"), Buffer.from([0, 1, 2, 3]));

  const search = await callBackend("searchFiles", root, { query: "app", limit: 10 });
  assert.deepEqual(search.files, [{ type: "file", name: "app.js", path: "src/app.js" }]);

  const read = await callBackend("readFile", root, { path: "README.md" });
  assert.equal(read.file.content, "hello readme");
  assert.equal(read.file.mimeType, "text/markdown");

  await rejectBackend("readFile", root, { path: "src/bin.dat" });

  const context = await callBackend("resolveContext", root, { text: "use @README.md and `@ignored` @README.md", refs: ["src/app.js"] });
  assert.deepEqual(context.refs, ["src/app.js", "README.md"]);
  assert.equal(context.attachments.length, 2);
});

test("chatState parses pi JSONL session fixtures", async () => {
  const root = await mkdtemp(join(tmpdir(), "pi-web-chat-workspace-"));
  const home = await mkdtemp(join(tmpdir(), "pi-web-chat-home-"));
  const safe = `--${root.replace(/^\/+/, "").replace(/[\\/:]/g, "-")}--`;
  const sessionDir = join(home, ".pi", "agent", "sessions", safe);
  await mkdir(sessionDir, { recursive: true });
  await writeFile(join(sessionDir, "session.jsonl"), [
    JSON.stringify({ type: "session", id: "pi-session-1" }),
    JSON.stringify({ type: "message", id: "u1", timestamp: "2026-01-02T03:04:05.000Z", message: { role: "user", content: "hello" } }),
    JSON.stringify({ type: "message", id: "a1", timestamp: "2026-01-02T03:04:06.000Z", message: { role: "assistant", content: [{ type: "text", text: "hi" }] } }),
    JSON.stringify({ type: "message", id: "t1", timestamp: "2026-01-02T03:04:07.000Z", message: { role: "toolResult", content: "done" } }),
  ].join("\n"));

  const result = await callBackend("chatState", root, {}, { HOME: home });
  assert.equal(result.activeSessionId, "pi-session-1");
  assert.deepEqual(result.messages.map((message) => [message.id, message.role, message.text]), [["u1", "user", "hello"], ["a1", "assistant", "hi"], ["t1", "tool", "done"]]);
});

test("handle rejects unknown methods", async () => {
  await rejectBackend("missing", ".");
});

test("backend wrapper works through symlinked plugin installs", async () => {
  const root = await mkdtemp(join(tmpdir(), "pi-web-chat-"));
  const link = join(root, "linked-backend.js");
  await symlink(backend, link);
  const result = await runBackend(link, "commands", ".");
  assert.equal(result.code, 0, result.stderr);
  assert.ok(JSON.parse(result.stdout).commands.some((item) => item.command === "/chat-help"));
});

test("runShell captures output and exit code", async () => {
  const root = await mkdtemp(join(tmpdir(), "pi-web-chat-"));
  const result = await callBackend("runShell", root, { command: "printf ok" });
  assert.equal(result.output, "ok");
  assert.equal(result.exitCode, 0);

  const failed = await callBackend("runShell", root, { command: "exit 7" });
  assert.equal(failed.exitCode, 7);
});
