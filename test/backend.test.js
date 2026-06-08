import { chmod, mkdtemp, readFile, readdir, writeFile, mkdir, symlink } from "node:fs/promises";
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

test("submitPrompt creates a resumable pi session through plugin backend", async () => {
  const root = await mkdtemp(join(tmpdir(), "pi-web-chat-workspace-"));
  const home = await mkdtemp(join(tmpdir(), "pi-web-chat-home-"));
  const bin = await mkdtemp(join(tmpdir(), "pi-web-chat-bin-"));
  const fakePi = join(bin, "pi");
  await writeFile(fakePi, `#!/usr/bin/env node
const fs = require('fs');
const session = process.argv[process.argv.indexOf('--session') + 1];
let input = '';
process.stdin.on('data', chunk => input += chunk);
process.stdin.on('end', () => {
  const prompt = JSON.parse(input.trim()).message;
  fs.appendFileSync(session, JSON.stringify({ type: 'message', id: 'u1', timestamp: '2026-01-02T03:04:05.000Z', message: { role: 'user', content: prompt } }) + '\\n');
  fs.appendFileSync(session, JSON.stringify({ type: 'message', id: 'a1', timestamp: '2026-01-02T03:04:06.000Z', message: { role: 'assistant', content: [{ type: 'text', text: 'answer' }] } }) + '\\n');
});
`);
  await chmod(fakePi, 0o755);

  const result = await callBackend("submitPrompt", root, { text: "hello pi", attachments: [{ name: "note.txt", content: "attached context" }] }, { HOME: home, PATH: `${bin}:${process.env.PATH}` });
  assert.equal(result.accepted, true);
  assert.equal(result.messages.at(-1).text, "answer");
  const sessionDir = join(root, ".pi", "sessions");
  const files = await readdir(sessionDir);
  assert.equal(files.length, 1);
  const content = await readFile(join(sessionDir, files[0]), "utf8");
  assert.match(content, /"cwd":"/);
  assert.match(content, /hello pi/);
  assert.match(content, /attached context/);
});

test("streaming methods capture pi rpc text thinking and tool events", async () => {
  const root = await mkdtemp(join(tmpdir(), "pi-web-chat-workspace-"));
  const home = await mkdtemp(join(tmpdir(), "pi-web-chat-home-"));
  const bin = await mkdtemp(join(tmpdir(), "pi-web-chat-bin-"));
  const fakePi = join(bin, "pi");
  await writeFile(fakePi, `#!/usr/bin/env node
process.stdin.on('data', () => {});
process.stdin.on('end', () => {
  console.log(JSON.stringify({ type: 'response', command: 'prompt', success: true }));
  console.log(JSON.stringify({ type: 'message_update', assistantMessageEvent: { type: 'thinking_delta', delta: 'think' } }));
  console.log(JSON.stringify({ type: 'message_update', assistantMessageEvent: { type: 'text_delta', delta: 'hello' } }));
  console.log(JSON.stringify({ type: 'tool_execution_start', toolCallId: 't1', toolName: 'bash', args: { command: 'pwd' } }));
  console.log(JSON.stringify({ type: 'tool_execution_update', toolCallId: 't1', toolName: 'bash', partialResult: { content: [{ type: 'text', text: 'out' }] } }));
  console.log(JSON.stringify({ type: 'tool_execution_end', toolCallId: 't1', toolName: 'bash', result: { content: [{ type: 'text', text: 'done' }] } }));
  console.log(JSON.stringify({ type: 'agent_end', messages: [] }));
});
`);
  await chmod(fakePi, 0o755);

  const start = await callBackend("startPrompt", root, { text: "hello pi" }, { HOME: home, PATH: `${bin}:${process.env.PATH}` });
  assert.equal(start.accepted, true);
  let stream = { events: [], cursor: 0, isStreaming: true };
  const events = [];
  for (let index = 0; index < 20 && stream.isStreaming; index += 1) {
    await new Promise((resolve) => setTimeout(resolve, 50));
    stream = await callBackend("streamEvents", root, { runId: start.runId, cursor: stream.cursor }, { HOME: home, PATH: `${bin}:${process.env.PATH}` });
    events.push(...stream.events);
  }
  const types = events.map((event) => event.type);
  assert.ok(types.includes("thinking.delta"));
  assert.ok(types.includes("text.delta"));
  assert.ok(types.includes("tool.start"));
  assert.ok(types.includes("tool.delta"));
  assert.ok(types.includes("tool.end"));
  assert.equal(stream.isStreaming, false);
  assert.equal(events.some((event) => event.type === "run.end"), true);
});

test("abortPrompt terminates the spawned pi child", async () => {
  const root = await mkdtemp(join(tmpdir(), "pi-web-chat-workspace-"));
  const home = await mkdtemp(join(tmpdir(), "pi-web-chat-home-"));
  const bin = await mkdtemp(join(tmpdir(), "pi-web-chat-bin-"));
  const marker = join(home, "pi-aborted.txt");
  const ready = join(home, "pi-ready.txt");
  const fakePi = join(bin, "pi");
  await writeFile(fakePi, `#!/usr/bin/env node
const fs = require('fs');
process.on('SIGTERM', () => {
  fs.writeFileSync(process.env.PI_ABORT_MARKER, 'aborted');
  process.exit(0);
});
fs.writeFileSync(process.env.PI_READY_MARKER, 'ready');
process.stdin.resume();
setInterval(() => {}, 1000);
`);
  await chmod(fakePi, 0o755);

  const env = { HOME: home, PATH: `${bin}:${process.env.PATH}`, PI_ABORT_MARKER: marker, PI_READY_MARKER: ready };
  const start = await callBackend("startPrompt", root, { text: "abort me" }, env);
  for (let index = 0; index < 20; index += 1) {
    await new Promise((resolve) => setTimeout(resolve, 50));
    const stream = await callBackend("streamEvents", root, { runId: start.runId, cursor: 0 }, env);
    if (stream.events.some((event) => event.type === "run.start")) break;
  }
  let readyText = "";
  for (let index = 0; index < 20 && readyText !== "ready"; index += 1) {
    await new Promise((resolve) => setTimeout(resolve, 50));
    readyText = await readFile(ready, "utf8").catch(() => "");
  }
  assert.equal(readyText, "ready");

  const abort = await callBackend("abortPrompt", root, { runId: start.runId }, env);
  assert.equal(abort.aborted, true);

  let markerText = "";
  for (let index = 0; index < 20 && markerText !== "aborted"; index += 1) {
    await new Promise((resolve) => setTimeout(resolve, 50));
    markerText = await readFile(marker, "utf8").catch(() => "");
  }
  assert.equal(markerText, "aborted");
});

test("streaming methods reject path-like run ids", async () => {
  const root = await mkdtemp(join(tmpdir(), "pi-web-chat-workspace-"));
  await rejectBackend("streamEvents", root, { runId: "../../escape", cursor: 0 });
  await rejectBackend("abortPrompt", root, { runId: "../../escape" });
});

test("chatState reads selected session files directly", async () => {
  const root = await mkdtemp(join(tmpdir(), "pi-web-chat-workspace-"));
  const home = await mkdtemp(join(tmpdir(), "pi-web-chat-home-"));
  const safe = `--${root.replace(/^\/+/, "").replace(/[\\/:]/g, "-")}--`;
  const sessionDir = join(home, ".pi", "agent", "sessions", safe);
  await mkdir(sessionDir, { recursive: true });
  await writeFile(join(sessionDir, "newer_session-1.jsonl"), [
    JSON.stringify({ type: "session", id: "session-1" }),
    JSON.stringify({ type: "message", id: "u1", timestamp: "2026-01-02T03:04:05.000Z", message: { role: "user", content: "hello" } }),
    JSON.stringify({ type: "message", id: "a1", timestamp: "2026-01-02T03:04:06.000Z", message: { role: "assistant", content: "from file" } }),
  ].join("\n"));

  const result = await callBackend(
    "chatState",
    root,
    { workspaceId: "workspace/one", data: { sessionId: "session-1" } },
    { HOME: home },
  );

  assert.equal(result.activeSessionId, "session-1");
  assert.equal(result.isStreaming, false);
  assert.deepEqual(result.messages.map((message) => [message.id, message.role, message.text]), [["u1", "user", "hello"], ["a1", "assistant", "from file"]]);
});

test("chatState finds sidebar-selected sessions from an explicit workspace path", async () => {
  const activeRoot = await mkdtemp(join(tmpdir(), "pi-web-chat-active-workspace-"));
  const selectedRoot = await mkdtemp(join(tmpdir(), "pi-web-chat-selected-workspace-"));
  const home = await mkdtemp(join(tmpdir(), "pi-web-chat-home-"));
  const selectedSessionDir = join(selectedRoot, ".pi", "sessions");
  await mkdir(selectedSessionDir, { recursive: true });
  await writeFile(join(selectedSessionDir, "newer_cross-session.jsonl"), [
    JSON.stringify({ type: "session", id: "cross-session" }),
    JSON.stringify({ type: "message", id: "u1", timestamp: "2026-01-02T03:04:05.000Z", message: { role: "user", content: "from other workspace" } }),
  ].join("\n"));

  const result = await callBackend("chatState", activeRoot, { sessionId: "cross-session", workspacePath: selectedRoot }, { HOME: home });

  assert.equal(result.activeSessionId, "cross-session");
  assert.deepEqual(result.messages.map((message) => [message.id, message.role, message.text]), [["u1", "user", "from other workspace"]]);
});

test("chatState caps large transcript responses so plugin bridge can parse JSON", async () => {
  const root = await mkdtemp(join(tmpdir(), "pi-web-chat-workspace-"));
  const sessionDir = join(root, ".pi", "sessions");
  await mkdir(sessionDir, { recursive: true });
  const lines = [JSON.stringify({ type: "session", id: "large-session" })];

  for (let index = 0; index < 80; index += 1) {
    lines.push(JSON.stringify({
      type: "message",
      id: `m${index}`,
      timestamp: "2026-01-02T03:04:05.000Z",
      message: { role: index % 2 === 0 ? "user" : "assistant", content: "x".repeat(5000) },
    }));
  }

  await writeFile(join(sessionDir, "newer_large-session.jsonl"), lines.join("\n"));

  const result = await callBackend("chatState", root, { sessionId: "large-session" });
  const encoded = JSON.stringify(result);

  assert.equal(result.activeSessionId, "large-session");
  assert.ok(encoded.length < 65_000, `encoded length ${encoded.length} should fit backend bridge`);
  assert.ok(result.messages.length > 0);
  assert.equal(result.messages.at(-1).id, "m79");
});

test("chatState parses pi JSONL session fixtures", async () => {
  const root = await mkdtemp(join(tmpdir(), "pi-web-chat-workspace-"));
  const home = await mkdtemp(join(tmpdir(), "pi-web-chat-home-"));
  const safe = `--${root.replace(/^\/+/, "").replace(/[\\/:]/g, "-")}--`;
  const sessionDir = join(home, ".pi", "agent", "sessions", safe);
  await mkdir(sessionDir, { recursive: true });
  await writeFile(join(sessionDir, "newer_pi-session-1.jsonl"), [
    JSON.stringify({ type: "session", id: "pi-session-1" }),
    JSON.stringify({ type: "message", id: "u1", timestamp: "2026-01-02T03:04:05.000Z", message: { role: "user", content: "hello" } }),
    JSON.stringify({ type: "message", id: "a1", timestamp: "2026-01-02T03:04:06.000Z", message: { role: "assistant", content: [{ type: "text", text: "hi" }] } }),
    JSON.stringify({ type: "message", id: "t1", timestamp: "2026-01-02T03:04:07.000Z", message: { role: "toolResult", content: "done" } }),
  ].join("\n"));
  await writeFile(join(sessionDir, "older_pi-session-2.jsonl"), [
    JSON.stringify({ type: "session", id: "pi-session-2" }),
    JSON.stringify({ type: "message", id: "u2", timestamp: "2026-01-02T03:04:08.000Z", message: { role: "user", content: "selected" } }),
  ].join("\n"));

  const result = await callBackend("chatState", root, { sessionId: "pi-session-1" }, { HOME: home });
  assert.equal(result.activeSessionId, "pi-session-1");
  assert.deepEqual(result.messages.map((message) => [message.id, message.role, message.text]), [["u1", "user", "hello"], ["a1", "assistant", "hi"], ["t1", "tool", "done"]]);

  const selected = await callBackend("chatState", root, { sessionId: "pi-session-2" }, { HOME: home });
  assert.equal(selected.activeSessionId, "pi-session-2");
  assert.deepEqual(selected.messages.map((message) => [message.id, message.role, message.text]), [["u2", "user", "selected"]]);
});

test("searchFiles reports configurable traversal truncation", async () => {
  const root = await mkdtemp(join(tmpdir(), "pi-web-chat-"));
  await writeFile(join(root, "a.txt"), "a");
  await writeFile(join(root, "b.txt"), "b");

  const result = await callBackend("searchFiles", root, { query: "", limit: 10 }, { PI_WEB_CHAT_MAX_WORKSPACE_SEARCH_ENTRIES: "1" });
  assert.equal(result.truncated, true);
  assert.ok(result.files.length <= 1);
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
