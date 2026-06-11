import { chmod, mkdtemp, readFile, readdir, writeFile, mkdir, symlink } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { spawn } from "node:child_process";
import test from "node:test";
import assert from "node:assert/strict";

const backend = new URL("../backend.js", import.meta.url).pathname;
const backendBinary = new URL(`../bin/${process.platform}-${process.arch === "x64" ? "amd64" : process.arch}/pi-web-chat-backend`, import.meta.url).pathname;

function runBackend(script, method, workspaceRoot, data = {}, env = {}) {
  return runBackendCommand(process.execPath, [script, method, workspaceRoot], data, env);
}

function runBackendBinary(method, workspaceRoot, data = {}, env = {}) {
  return runBackendCommand(backendBinary, [method, workspaceRoot], data, env);
}

function runBackendCommand(command, args, data = {}, env = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: ["pipe", "pipe", "pipe"], env: { ...process.env, ...env } });
    let stdout = "";
    let stderr = "";
    child.stdout.on("data", (chunk) => (stdout += chunk));
    child.stderr.on("data", (chunk) => (stderr += chunk));
    child.on("error", reject);
    child.on("close", (code) => resolve({ code, stdout, stderr }));
    child.stdin.end(JSON.stringify(data));
  });
}

function runBackendStreamUntil(command, args, data = {}, env = {}, marker = "\n\n") {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: ["pipe", "pipe", "pipe"], env: { ...process.env, ...env } });
    let stdout = "";
    let stderr = "";
    const timer = setTimeout(() => {
      child.kill("SIGTERM");
      reject(new Error(`stream marker timeout: ${stderr}`));
    }, 3000);

    child.stdout.on("data", (chunk) => {
      stdout += chunk;

      if (stdout.includes(marker)) {
        clearTimeout(timer);
        child.kill("SIGTERM");
        resolve({ stdout, stderr });
      }
    });
    child.stderr.on("data", (chunk) => (stderr += chunk));
    child.on("error", (error) => {
      clearTimeout(timer);
      reject(error);
    });
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

test("submitPrompt honors settings sessionDir", async () => {
  const root = await mkdtemp(join(tmpdir(), "pi-web-chat-workspace-"));
  const home = await mkdtemp(join(tmpdir(), "pi-web-chat-home-"));
  const bin = await mkdtemp(join(tmpdir(), "pi-web-chat-bin-"));
  const fakePi = join(bin, "pi");
  await mkdir(join(root, ".pi"), { recursive: true });
  await writeFile(join(root, ".pi", "settings.json"), JSON.stringify({ sessionDir: "custom-sessions" }));
  await writeFile(fakePi, `#!/usr/bin/env node
const fs = require('fs');
const session = process.argv[process.argv.indexOf('--session') + 1];
process.stdin.on('data', () => {});
process.stdin.on('end', () => {
  const message = {
    type: 'message',
    id: 'a1',
    timestamp: '2026-01-02T03:04:06.000Z',
    message: { role: 'assistant', content: 'answer' },
  };
  fs.appendFileSync(session, JSON.stringify(message) + '\\n');
});
`);
  await chmod(fakePi, 0o755);

  const result = await callBackend(
    "submitPrompt",
    root,
    { text: "hello pi" },
    { HOME: home, PATH: `${bin}:${process.env.PATH}` },
  );

  assert.equal(result.accepted, true);
  assert.deepEqual(result.warnings, []);
  const files = await readdir(join(root, "custom-sessions"));
  assert.equal(files.length, 1);
});

test("startPrompt honors settings sessionDir", async () => {
  const root = await mkdtemp(join(tmpdir(), "pi-web-chat-workspace-"));
  const home = await mkdtemp(join(tmpdir(), "pi-web-chat-home-"));
  const bin = await mkdtemp(join(tmpdir(), "pi-web-chat-bin-"));
  const fakePi = join(bin, "pi");
  const sessionDir = join(root, "configured", "sessions");
  await mkdir(join(root, ".pi"), { recursive: true });
  await writeFile(join(root, ".pi", "settings.json"), JSON.stringify({ sessionDir }));
  await writeFile(fakePi, `#!/usr/bin/env node
process.stdin.on('data', () => {});
process.stdin.on('end', () => {});
`);
  await chmod(fakePi, 0o755);

  const result = await callBackend(
    "startPrompt",
    root,
    { text: "hello pi" },
    { HOME: home, PATH: `${bin}:${process.env.PATH}` },
  );

  assert.equal(result.accepted, true);
  assert.deepEqual(result.warnings, []);
  const files = await readdir(sessionDir);
  assert.equal(files.some((name) => name.includes(result.activeSessionId)), true);
});

test("startPrompt warns and falls back when settings sessionDir is outside workspace", async () => {
  const root = await mkdtemp(join(tmpdir(), "pi-web-chat-workspace-"));
  const home = await mkdtemp(join(tmpdir(), "pi-web-chat-home-"));
  const bin = await mkdtemp(join(tmpdir(), "pi-web-chat-bin-"));
  const outside = await mkdtemp(join(tmpdir(), "pi-web-chat-outside-"));
  const fakePi = join(bin, "pi");
  await mkdir(join(root, ".pi"), { recursive: true });
  await writeFile(join(root, ".pi", "settings.json"), JSON.stringify({ sessionDir: outside }));
  await writeFile(fakePi, `#!/usr/bin/env node
process.stdin.on('data', () => {});
process.stdin.on('end', () => {});
`);
  await chmod(fakePi, 0o755);

  const result = await callBackend(
    "startPrompt",
    root,
    { text: "hello pi" },
    { HOME: home, PATH: `${bin}:${process.env.PATH}` },
  );

  assert.equal(result.accepted, true);
  assert.deepEqual(result.warnings, [".pi/settings.json sessionDir escapes the workspace; using the default session directory"]);
  const fallbackFiles = await readdir(join(root, ".pi", "sessions"));
  const outsideFiles = await readdir(outside);
  assert.equal(fallbackFiles.some((name) => name.includes(result.activeSessionId)), true);
  assert.equal(outsideFiles.length, 0);
});

test("startPrompt warns and falls back when settings sessionDir symlinks outside workspace", async () => {
  const root = await mkdtemp(join(tmpdir(), "pi-web-chat-workspace-"));
  const home = await mkdtemp(join(tmpdir(), "pi-web-chat-home-"));
  const bin = await mkdtemp(join(tmpdir(), "pi-web-chat-bin-"));
  const outside = await mkdtemp(join(tmpdir(), "pi-web-chat-outside-"));
  const fakePi = join(bin, "pi");
  await symlink(outside, join(root, "link-sessions"));
  await mkdir(join(root, ".pi"), { recursive: true });
  await writeFile(join(root, ".pi", "settings.json"), JSON.stringify({ sessionDir: "link-sessions" }));
  await writeFile(fakePi, `#!/usr/bin/env node
process.stdin.on('data', () => {});
process.stdin.on('end', () => {});
`);
  await chmod(fakePi, 0o755);

  const result = await callBackend(
    "startPrompt",
    root,
    { text: "hello pi" },
    { HOME: home, PATH: `${bin}:${process.env.PATH}` },
  );

  assert.equal(result.accepted, true);
  assert.deepEqual(result.warnings, [".pi/settings.json sessionDir escapes the workspace; using the default session directory"]);
  const fallbackFiles = await readdir(join(root, ".pi", "sessions"));
  const outsideFiles = await readdir(outside);
  assert.equal(fallbackFiles.some((name) => name.includes(result.activeSessionId)), true);
  assert.equal(outsideFiles.length, 0);
});

test("startPrompt warns and falls back when settings sessionDir is invalid", async () => {
  const root = await mkdtemp(join(tmpdir(), "pi-web-chat-workspace-"));
  const home = await mkdtemp(join(tmpdir(), "pi-web-chat-home-"));
  const bin = await mkdtemp(join(tmpdir(), "pi-web-chat-bin-"));
  const fakePi = join(bin, "pi");
  await mkdir(join(root, ".pi"), { recursive: true });
  await writeFile(join(root, ".pi", "settings.json"), JSON.stringify({ sessionDir: "" }));
  await writeFile(fakePi, `#!/usr/bin/env node
process.stdin.on('data', () => {});
process.stdin.on('end', () => {});
`);
  await chmod(fakePi, 0o755);

  const result = await callBackend(
    "startPrompt",
    root,
    { text: "hello pi" },
    { HOME: home, PATH: `${bin}:${process.env.PATH}` },
  );

  assert.equal(result.accepted, true);
  assert.deepEqual(result.warnings, [".pi/settings.json sessionDir must be a non-empty string; using the default session directory"]);
  const fallbackFiles = await readdir(join(root, ".pi", "sessions"));
  assert.equal(fallbackFiles.some((name) => name.includes(result.activeSessionId)), true);
});

test("compiled submitPrompt warns and falls back when settings sessionDir is invalid", async () => {
  const root = await mkdtemp(join(tmpdir(), "pi-web-chat-workspace-"));
  const home = await mkdtemp(join(tmpdir(), "pi-web-chat-home-"));
  const bin = await mkdtemp(join(tmpdir(), "pi-web-chat-bin-"));
  const fakePi = join(bin, "pi");
  await mkdir(join(root, ".pi"), { recursive: true });
  await writeFile(join(root, ".pi", "settings.json"), JSON.stringify({ sessionDir: 1 }));
  await writeFile(fakePi, `#!/usr/bin/env node
const fs = require('fs');
const session = process.argv[process.argv.indexOf('--session') + 1];
process.stdin.on('data', () => {});
process.stdin.on('end', () => {
  fs.appendFileSync(session, JSON.stringify({ type: 'message', id: 'a1', message: { role: 'assistant', content: 'ok' } }) + '\\n');
});
`);
  await chmod(fakePi, 0o755);

  const result = await runBackendBinary(
    "submitPrompt",
    root,
    { text: "hello pi" },
    { HOME: home, PATH: `${bin}:${process.env.PATH}` },
  );
  assert.equal(result.code, 0, result.stderr);
  const parsed = JSON.parse(result.stdout);

  assert.equal(parsed.accepted, true);
  assert.deepEqual(parsed.warnings, [".pi/settings.json sessionDir must be a non-empty string; using the default session directory"]);
  const fallbackFiles = await readdir(join(root, ".pi", "sessions"));
  assert.equal(fallbackFiles.some((name) => name.includes(parsed.activeSessionId)), true);
});

test("js and compiled startPrompt agree on settings sessionDir warnings", async () => {
  const invalidWarning = ".pi/settings.json sessionDir must be a non-empty string; using the default session directory";
  const unsafeWarning = ".pi/settings.json sessionDir escapes the workspace; using the default session directory";
  const cases = [
    { name: "blank", warning: invalidWarning, settings: () => ({ sessionDir: "" }) },
    { name: "outside", warning: unsafeWarning, settings: (outside) => ({ sessionDir: outside }) },
    { name: "symlink", warning: unsafeWarning, settings: () => ({ sessionDir: "link-sessions" }), symlink: true },
  ];

  for (const item of cases) {
    const roots = [
      await mkdtemp(join(tmpdir(), `pi-web-chat-js-${item.name}-`)),
      await mkdtemp(join(tmpdir(), `pi-web-chat-go-${item.name}-`)),
    ];
    const home = await mkdtemp(join(tmpdir(), `pi-web-chat-home-${item.name}-`));
    const bin = await mkdtemp(join(tmpdir(), `pi-web-chat-bin-${item.name}-`));
    const outside = await mkdtemp(join(tmpdir(), `pi-web-chat-outside-${item.name}-`));
    const fakePi = join(bin, "pi");
    await writeFile(fakePi, `#!/usr/bin/env node
process.stdin.on('data', () => {});
process.stdin.on('end', () => {});
`);
    await chmod(fakePi, 0o755);

    const outputs = [];
    for (const root of roots) {
      await mkdir(join(root, ".pi"), { recursive: true });

      if (item.symlink) {
        await symlink(outside, join(root, "link-sessions"));
      }

      await writeFile(join(root, ".pi", "settings.json"), JSON.stringify(item.settings(outside)));
    }

    outputs.push(await callBackend(
      "startPrompt",
      roots[0],
      { text: "hello pi" },
      { HOME: home, PATH: `${bin}:${process.env.PATH}` },
    ));

    const compiled = await runBackendBinary(
      "startPrompt",
      roots[1],
      { text: "hello pi" },
      { HOME: home, PATH: `${bin}:${process.env.PATH}` },
    );
    assert.equal(compiled.code, 0, compiled.stderr);
    outputs.push(JSON.parse(compiled.stdout));

    assert.deepEqual(outputs.map((output) => output.warnings), [[item.warning], [item.warning]]);
  }
});

test("startPrompt fails closed when fallback session dir symlinks outside workspace", async () => {
  const root = await mkdtemp(join(tmpdir(), "pi-web-chat-workspace-"));
  const home = await mkdtemp(join(tmpdir(), "pi-web-chat-home-"));
  const bin = await mkdtemp(join(tmpdir(), "pi-web-chat-bin-"));
  const outside = await mkdtemp(join(tmpdir(), "pi-web-chat-outside-"));
  const fakePi = join(bin, "pi");
  await mkdir(join(root, ".pi"), { recursive: true });
  await symlink(outside, join(root, ".pi", "sessions"));
  await writeFile(join(root, ".pi", "settings.json"), JSON.stringify({ sessionDir: outside }));
  await writeFile(fakePi, `#!/usr/bin/env node
process.stdin.on('data', () => {});
process.stdin.on('end', () => {});
`);
  await chmod(fakePi, 0o755);

  const result = await runBackend(
    backend,
    "startPrompt",
    root,
    { text: "hello pi" },
    { HOME: home, PATH: `${bin}:${process.env.PATH}` },
  );

  assert.equal(result.code, 1);
  assert.match(result.stderr, /session directory escapes workspace/);
  assert.equal((await readdir(outside)).length, 0);
});

test("compiled submitPrompt fails closed when fallback session dir symlinks outside workspace", async () => {
  const root = await mkdtemp(join(tmpdir(), "pi-web-chat-workspace-"));
  const home = await mkdtemp(join(tmpdir(), "pi-web-chat-home-"));
  const bin = await mkdtemp(join(tmpdir(), "pi-web-chat-bin-"));
  const outside = await mkdtemp(join(tmpdir(), "pi-web-chat-outside-"));
  const fakePi = join(bin, "pi");
  await mkdir(join(root, ".pi"), { recursive: true });
  await symlink(outside, join(root, ".pi", "sessions"));
  await writeFile(join(root, ".pi", "settings.json"), JSON.stringify({ sessionDir: outside }));
  await writeFile(fakePi, `#!/usr/bin/env node
process.stdin.on('data', () => {});
process.stdin.on('end', () => {});
`);
  await chmod(fakePi, 0o755);

  const result = await runBackendBinary(
    "submitPrompt",
    root,
    { text: "hello pi" },
    { HOME: home, PATH: `${bin}:${process.env.PATH}` },
  );

  assert.equal(result.code, 1);
  assert.match(result.stderr, /session directory escapes workspace/);
  assert.equal((await readdir(outside)).length, 0);
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
  console.log(JSON.stringify({ type: 'message_update', assistantMessageEvent: { type: 'toolcall_start', toolCall: { id: 't0', name: 'read', arguments: { path: 'README.md' } } } }));
  console.log(JSON.stringify({ type: 'message_update', assistantMessageEvent: { type: 'toolcall_end', toolCall: { id: 't0', name: 'read' } } }));
  console.log(JSON.stringify({ type: 'message_update', assistantMessageEvent: { type: 'toolcall_start', toolCall: { id: 't2', name: 'edit', arguments: { patch: 'x'.repeat(2000) } } } }));
  console.log(JSON.stringify({ type: 'message_update', assistantMessageEvent: { type: 'toolcall_start', toolCall: { id: 't3', name: 'edit', arguments: { patch: '漢'.repeat(400) } } } }));
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
  assert.deepEqual(events.find((event) => event.toolCallId === "t0" && event.type === "tool.start").args, { path: "README.md" });
  assert.equal(events.find((event) => event.toolCallId === "t0" && event.type === "tool.start").argsStatus, "present");
  assert.equal(events.find((event) => event.toolCallId === "t0" && event.type === "tool.end").argsStatus, "unavailable");
  assert.equal(events.find((event) => event.toolCallId === "t2" && event.type === "tool.start").argsStatus, "truncated");
  assert.equal(events.find((event) => event.toolCallId === "t2" && event.type === "tool.start").args._truncated, true);
  assert.equal(events.find((event) => event.toolCallId === "t2" && event.type === "tool.start").args._preview, undefined);
  assert.equal(events.find((event) => event.toolCallId === "t3" && event.type === "tool.start").argsStatus, "truncated");
  assert.equal(events.find((event) => event.toolCallId === "t3" && event.type === "tool.start").args._truncated, true);
  assert.deepEqual(events.find((event) => event.toolCallId === "t1" && event.type === "tool.start").args, { command: "pwd" });
  assert.equal(events.find((event) => event.toolCallId === "t1" && event.type === "tool.start").argsStatus, "present");
  assert.equal(stream.isStreaming, false);
  assert.equal(events.some((event) => event.type === "run.end"), true);
});

test("backend wrapper startPrompt uses captured workspace path for existing and new sessions", async () => {
  const root = await mkdtemp(join(tmpdir(), "pi-web-chat-workspace-"));
  const otherRoot = await mkdtemp(join(tmpdir(), "pi-web-chat-other-"));
  const home = await mkdtemp(join(tmpdir(), "pi-web-chat-home-"));
  const bin = await mkdtemp(join(tmpdir(), "pi-web-chat-bin-"));
  const fakePi = join(bin, "pi");
  await writeFile(fakePi, `#!/usr/bin/env node
process.stdin.on('data', () => {});
process.stdin.on('end', () => {
  console.log(JSON.stringify({ type: 'message_update', assistantMessageEvent: { type: 'text_delta', delta: process.cwd() } }));
});
`);
  await chmod(fakePi, 0o755);
  const workspaceSessionId = "workspace-session-id";
  const workspaceSessionDir = join(root, ".pi", "sessions");
  await mkdir(workspaceSessionDir, { recursive: true });
  await writeFile(join(workspaceSessionDir, `existing_${workspaceSessionId}.jsonl`), `${JSON.stringify({ type: "session", id: workspaceSessionId, cwd: root })}\n`);

  const existing = await callBackend(
    "startPrompt",
    otherRoot,
    { text: "hello", sessionId: workspaceSessionId, workspacePath: root },
    { HOME: home, PATH: `${bin}:${process.env.PATH}` },
  );
  const created = await callBackend(
    "startPrompt",
    root,
    { text: "new session", sessionId: "", workspacePath: root },
    { HOME: home, PATH: `${bin}:${process.env.PATH}` },
  );

  assert.equal(existing.activeSessionId, workspaceSessionId);
  assert.ok(created.activeSessionId);
  assert.equal((await readdir(workspaceSessionDir)).some((name) => name.includes(created.activeSessionId)), true);
});

test("backend wrapper creates configured sessionDir before using existing session", async () => {
  const root = await mkdtemp(join(tmpdir(), "pi-web-chat-workspace-"));
  const home = await mkdtemp(join(tmpdir(), "pi-web-chat-home-"));
  const bin = await mkdtemp(join(tmpdir(), "pi-web-chat-bin-"));
  const fakePi = join(bin, "pi");
  const configuredDir = join(root, "configured", "sessions");
  const existingSessionId = "existing-configured-session";
  const safe = `--${root.replace(/^\/+/, "").replace(/[\\/:]/g, "-")}--`;
  const agentSessionDir = join(home, ".pi", "agent", "sessions", safe);
  await mkdir(join(root, ".pi"), { recursive: true });
  await mkdir(agentSessionDir, { recursive: true });
  await writeFile(join(root, ".pi", "settings.json"), JSON.stringify({ sessionDir: configuredDir }));
  await writeFile(join(agentSessionDir, `existing_${existingSessionId}.jsonl`), `${JSON.stringify({
    type: "session",
    id: existingSessionId,
    cwd: root,
  })}\n`);
  await writeFile(fakePi, `#!/usr/bin/env node
process.stdin.on('data', () => {});
process.stdin.on('end', () => {});
`);
  await chmod(fakePi, 0o755);

  const result = await callBackend(
    "startPrompt",
    root,
    { text: "hello", sessionId: existingSessionId },
    { HOME: home, PATH: `${bin}:${process.env.PATH}` },
  );

  assert.equal(result.activeSessionId, existingSessionId);
  assert.deepEqual(result.warnings, []);
  assert.deepEqual(await readdir(configuredDir), []);
});

test("backend wrapper completes stream when pi is unavailable", async () => {
  const root = await mkdtemp(join(tmpdir(), "pi-web-chat-workspace-"));
  const home = await mkdtemp(join(tmpdir(), "pi-web-chat-home-"));
  const env = { HOME: home, PATH: join(home, "missing-bin") };
  const start = await callBackend("startPrompt", root, { text: "hello" }, env);

  let stream = { events: [], cursor: 0, isStreaming: true };
  for (let index = 0; index < 20 && stream.isStreaming; index += 1) {
    await new Promise((resolve) => setTimeout(resolve, 50));
    stream = await callBackend("streamEvents", root, { runId: start.runId, cursor: stream.cursor }, env);
  }

  assert.equal(stream.isStreaming, false);
  assert.ok(stream.events.some((event) => event.type === "error"));
});

test("backend wrapper emits stream events as SSE frames", async () => {
  const root = await mkdtemp(join(tmpdir(), "pi-web-chat-workspace-"));
  const home = await mkdtemp(join(tmpdir(), "pi-web-chat-home-"));
  const bin = await mkdtemp(join(tmpdir(), "pi-web-chat-bin-"));
  const fakePi = join(bin, "pi");
  await writeFile(fakePi, `#!/usr/bin/env node
process.stdin.on('data', () => {});
process.stdin.on('end', () => {
  console.log(JSON.stringify({ type: 'message_update', assistantMessageEvent: { type: 'text_delta', delta: 'sse js' } }));
});
`);
  await chmod(fakePi, 0o755);

  const env = { HOME: home, PATH: `${bin}:${process.env.PATH}` };
  const start = await callBackend("startPrompt", root, { text: "hello" }, env);
  const stream = await runBackend(backend, "streamEventsSse", root, { runId: start.runId, cursor: 0 }, env);

  assert.equal(stream.code, 0, stream.stderr);
  assert.match(stream.stdout, /: pi-web-chat/);
  assert.match(stream.stdout, /event: text\.delta/);
  assert.match(stream.stdout, /data: .*sse js/);
});

test("js streaming backend caps response session ids", async () => {
  const root = await mkdtemp(join(tmpdir(), "pi-web-chat-"));
  const home = await mkdtemp(join(tmpdir(), "pi-web-chat-home-"));
  const bin = await mkdtemp(join(tmpdir(), "pi-web-chat-bin-"));
  const fakePi = join(bin, "pi");
  await writeFile(fakePi, `#!/usr/bin/env node
process.stdin.on('data', () => {});
process.stdin.on('end', () => {
  console.log(JSON.stringify({ type: 'agent_end', messages: [] }));
});
`);
  await chmod(fakePi, 0o755);
  const safe = `--${root.replace(/^\/+/, "").replace(/[\\/:]/g, "-")}--`;
  const sessionDir = join(home, ".pi", "agent", "sessions", safe);
  await mkdir(sessionDir, { recursive: true });
  const longID = "s".repeat(200);
  await writeFile(join(sessionDir, `existing_${longID}.jsonl`), JSON.stringify({ type: "session", id: longID }));

  const start = await callBackend("startPrompt", root, { text: "hello", sessionId: longID }, { HOME: home, PATH: `${bin}:${process.env.PATH}` });
  assert.equal(start.activeSessionId.length, 160);
  const stream = await callBackend("streamEvents", root, { runId: start.runId, cursor: 0 }, { HOME: home, PATH: `${bin}:${process.env.PATH}` });
  assert.equal(stream.activeSessionId.length, 160);
});

test("compiled backend exposes streaming methods", async () => {
  const root = await mkdtemp(join(tmpdir(), "pi-web-chat-workspace-"));
  const home = await mkdtemp(join(tmpdir(), "pi-web-chat-home-"));
  const bin = await mkdtemp(join(tmpdir(), "pi-web-chat-bin-"));
  const fakePi = join(bin, "pi");
  await writeFile(fakePi, `#!/usr/bin/env node
process.stdin.on('data', () => {});
process.stdin.on('end', () => {
  console.log(JSON.stringify({ type: 'message_update', assistantMessageEvent: { type: 'text_delta', delta: 'go stream' } }));
});
`);
  await chmod(fakePi, 0o755);

  const env = { HOME: home, PATH: `${bin}:${process.env.PATH}` };
  const start = await runBackendBinary("startPrompt", root, { data: { text: "hello" } }, env);
  assert.equal(start.code, 0, start.stderr);
  const started = JSON.parse(start.stdout);
  assert.equal(started.accepted, true);
  assert.ok(started.runId);

  let stream = { events: [], cursor: 0, isStreaming: true };
  for (let index = 0; index < 80 && stream.isStreaming; index += 1) {
    await new Promise((resolve) => setTimeout(resolve, 50));
    const result = await runBackendBinary(
      "streamEvents",
      root,
      { data: { runId: started.runId, cursor: stream.cursor } },
      env,
    );
    assert.equal(result.code, 0, result.stderr);
    stream = JSON.parse(result.stdout);
  }

  assert.equal(stream.isStreaming, false);
});

test("compiled backend emits stream events as SSE frames", async () => {
  const root = await mkdtemp(join(tmpdir(), "pi-web-chat-workspace-"));
  const home = await mkdtemp(join(tmpdir(), "pi-web-chat-home-"));
  const bin = await mkdtemp(join(tmpdir(), "pi-web-chat-bin-"));
  const fakePi = join(bin, "pi");
  await writeFile(fakePi, `#!/usr/bin/env node
process.stdin.on('data', () => {});
process.stdin.on('end', () => {
  console.log(JSON.stringify({ type: 'message_update', assistantMessageEvent: { type: 'text_delta', delta: 'sse go' } }));
});
`);
  await chmod(fakePi, 0o755);

  const env = { HOME: home, PATH: `${bin}:${process.env.PATH}` };
  const start = await runBackendBinary("startPrompt", root, { data: { text: "hello" } }, env);
  assert.equal(start.code, 0, start.stderr);
  const started = JSON.parse(start.stdout);
  await new Promise((resolve) => setTimeout(resolve, 50));
  const stream = await runBackendBinary("streamEventsSse", root, { data: { runId: started.runId, cursor: 0 } }, env);

  assert.equal(stream.code, 0, stream.stderr);
  assert.match(stream.stdout, /: pi-web-chat/);
  assert.match(stream.stdout, /event: text\.delta/);
  assert.match(stream.stdout, /data: .*sse go/);
});

test("compiled backend completes stream when pi is unavailable", async () => {
  const root = await mkdtemp(join(tmpdir(), "pi-web-chat-workspace-"));
  const home = await mkdtemp(join(tmpdir(), "pi-web-chat-home-"));
  const env = { HOME: home, PATH: join(home, "missing-bin") };
  const start = await runBackendBinary("startPrompt", root, { data: { text: "hello" } }, env);
  assert.equal(start.code, 0, start.stderr);
  const started = JSON.parse(start.stdout);

  let stream = { events: [], cursor: 0, isStreaming: true };
  for (let index = 0; index < 20 && stream.isStreaming; index += 1) {
    await new Promise((resolve) => setTimeout(resolve, 50));
    const result = await runBackendBinary(
      "streamEvents",
      root,
      { data: { runId: started.runId, cursor: stream.cursor } },
      env,
    );
    assert.equal(result.code, 0, result.stderr);
    stream = JSON.parse(result.stdout);
  }

  assert.equal(stream.isStreaming, false);
  assert.ok(stream.events.some((event) => event.type === "error"));
});

test("compiled backend abortPrompt terminates the spawned pi child", async () => {
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
  const start = await runBackendBinary("startPrompt", root, { data: { text: "abort me" } }, env);
  assert.equal(start.code, 0, start.stderr);
  const started = JSON.parse(start.stdout);

  let readyText = "";
  for (let index = 0; index < 20 && readyText !== "ready"; index += 1) {
    await new Promise((resolve) => setTimeout(resolve, 50));
    readyText = await readFile(ready, "utf8").catch(() => "");
  }
  assert.equal(readyText, "ready");

  const abort = await runBackendBinary("abortPrompt", root, { data: { runId: started.runId } }, env);
  assert.equal(abort.code, 0, abort.stderr);

  let markerText = "";
  for (let index = 0; index < 20 && markerText !== "aborted"; index += 1) {
    await new Promise((resolve) => setTimeout(resolve, 50));
    markerText = await readFile(marker, "utf8").catch(() => "");
  }
  assert.equal(markerText, "aborted");
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

test("chatState reads nested subagent session files by id", async () => {
  const root = await mkdtemp(join(tmpdir(), "pi-web-chat-workspace-"));
  const childDir = join(root, ".pi", "sessions", "parent-session", "run-abc", "run-0");
  await mkdir(childDir, { recursive: true });
  await writeFile(join(childDir, "session.jsonl"), [
    JSON.stringify({ type: "session", id: "child-session" }),
    JSON.stringify({ type: "message", id: "u1", timestamp: "2026-01-02T03:04:05.000Z", message: { role: "user", content: "from subagent" } }),
    JSON.stringify({ type: "message", id: "a1", timestamp: "2026-01-02T03:04:06.000Z", message: { role: "assistant", content: "child answer" } }),
  ].join("\n"));

  const result = await callBackend("chatState", root, { sessionId: "child-session" });

  assert.equal(result.activeSessionId, "child-session");
  assert.deepEqual(result.messages.map((message) => [message.id, message.role, message.text]), [
    ["u1", "user", "from subagent"],
    ["a1", "assistant", "child answer"],
  ]);
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

test("sessionEventsSse emits chat state as SSE frames", async () => {
  const root = await mkdtemp(join(tmpdir(), "pi-web-chat-workspace-"));
  const sessionDir = join(root, ".pi", "sessions");
  await mkdir(sessionDir, { recursive: true });
  await writeFile(join(sessionDir, "sse-session.jsonl"), [
    JSON.stringify({ type: "session", id: "sse-session" }),
    JSON.stringify({ type: "message", id: "u1", timestamp: "2026-01-02T03:04:05.000Z", message: { role: "user", content: "hello" } }),
  ].join("\n"));

  const stream = await runBackendStreamUntil(
    backendBinary,
    ["sessionEventsSse", root],
    { data: { sessionId: "sse-session" } },
    {},
    "event: chat.state",
  );

  assert.match(stream.stdout, /: pi-web-chat-session/);
  assert.match(stream.stdout, /event: chat\.state/);
  assert.match(stream.stdout, /data: .*"type":"chat.state"/);
  assert.match(stream.stdout, /data: .*sse-session/);
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
    JSON.stringify({ type: "message", id: "a2", timestamp: "2026-01-02T03:04:06.500Z", message: { role: "assistant", content: [{ type: "toolCall", id: "call-1", name: "bash", arguments: { command: "bun test" } }] } }),
    JSON.stringify({ type: "message", id: "t1", timestamp: "2026-01-02T03:04:07.000Z", message: { role: "toolResult", toolCallId: "call-1", toolName: "bash", content: [{ type: "text", text: "done" }], isError: false } }),
  ].join("\n"));
  await writeFile(join(sessionDir, "older_pi-session-2.jsonl"), [
    JSON.stringify({ type: "session", id: "pi-session-2" }),
    JSON.stringify({ type: "message", id: "u2", timestamp: "2026-01-02T03:04:08.000Z", message: { role: "user", content: "selected" } }),
  ].join("\n"));

  const result = await callBackend("chatState", root, { sessionId: "pi-session-1" }, { HOME: home });
  assert.equal(result.activeSessionId, "pi-session-1");
  assert.equal(result.isStreaming, false);
  assert.deepEqual(result.messages.map((message) => [message.id, message.role, message.text]), [["u1", "user", "hello"], ["a1", "assistant", "hi"], ["a2", "assistant", ""]]);
  assert.deepEqual(result.messages.at(-1).toolCalls, [{ id: "call-1", name: "bash", args: { command: "bun test" }, argsStatus: "present", text: "done", status: "ok" }]);

  const selected = await callBackend("chatState", root, { sessionId: "pi-session-2" }, { HOME: home });
  assert.equal(selected.activeSessionId, "pi-session-2");
  assert.deepEqual(selected.messages.map((message) => [message.id, message.role, message.text]), [["u2", "user", "selected"]]);
});

test("chatState caps large tool call arguments and generates stable fallback ids", async () => {
  const root = await mkdtemp(join(tmpdir(), "pi-web-chat-workspace-"));
  const home = await mkdtemp(join(tmpdir(), "pi-web-chat-home-"));
  const safe = `--${root.replace(/^\/+/, "").replace(/[\\/:]/g, "-")}--`;
  const sessionDir = join(home, ".pi", "agent", "sessions", safe);
  await mkdir(sessionDir, { recursive: true });
  await writeFile(join(sessionDir, "large-args.jsonl"), [
    JSON.stringify({ type: "session", id: "large-args" }),
    JSON.stringify({
      type: "message",
      id: "a1",
      timestamp: "2026-01-02T03:04:06.000Z",
      message: {
        role: "assistant",
        content: [
          { type: "toolCall", name: "edit", arguments: { nested: { patch: "x".repeat(2000000) } } },
          { type: "toolCall", name: "edit", arguments: { patch: "y".repeat(10) } },
        ],
      },
    }),
  ].join("\n"));

  const result = await callBackend("chatState", root, { sessionId: "large-args" }, { HOME: home });
  assert.equal(result.messages.length, 1);
  assert.equal(result.messages[0].toolCalls.length, 2);
  assert.notEqual(result.messages[0].toolCalls[0].id, result.messages[0].toolCalls[1].id);
  assert.equal(result.messages[0].toolCalls[0].args._truncated, true);
  assert.equal(result.messages[0].toolCalls[0].args._preview, undefined);
  assert.equal(result.messages[0].toolCalls[0].argsStatus, "truncated");
  assert.equal(result.messages[0].toolCalls[1].argsStatus, "present");
  assert.ok(JSON.stringify(result).length < 70000);
});

test("chatState caps excessive tool call count", async () => {
  const root = await mkdtemp(join(tmpdir(), "pi-web-chat-workspace-"));
  const home = await mkdtemp(join(tmpdir(), "pi-web-chat-home-"));
  const safe = `--${root.replace(/^\/+/, "").replace(/[\\/:]/g, "-")}--`;
  const sessionDir = join(home, ".pi", "agent", "sessions", safe);
  await mkdir(sessionDir, { recursive: true });
  const content = Array.from({ length: 5000 }, (_, index) => {
    return { type: "toolCall", name: "read", arguments: { path: `file-${index}.txt` } };
  });
  await writeFile(join(sessionDir, "many-tools.jsonl"), [
    JSON.stringify({ type: "session", id: "many-tools" }),
    JSON.stringify({ type: "message", id: "a1", timestamp: "2026-01-02T03:04:06.000Z", message: { role: "assistant", content } }),
  ].join("\n"));

  const result = await callBackend("chatState", root, { sessionId: "many-tools" }, { HOME: home });
  assert.equal(result.messages[0].toolCalls.length, 100);
  assert.ok(JSON.stringify(result).length < 70000);
});

test("chatState keeps tool-heavy transcript responses bounded", async () => {
  const root = await mkdtemp(join(tmpdir(), "pi-web-chat-workspace-"));
  const home = await mkdtemp(join(tmpdir(), "pi-web-chat-home-"));
  const safe = `--${root.replace(/^\/+/, "").replace(/[\\/:]/g, "-")}--`;
  const sessionDir = join(home, ".pi", "agent", "sessions", safe);
  await mkdir(sessionDir, { recursive: true });
  const lines = [JSON.stringify({ type: "session", id: "tool-heavy" })];
  for (let message = 0; message < 200; message += 1) {
    const content = Array.from({ length: 100 }, (_, index) => {
      return { type: "toolCall", id: "x".repeat(500), name: "read".repeat(80), arguments: { path: `${message}-${index}` } };
    });
    lines.push(JSON.stringify({
      type: "message",
      id: `a${message}`,
      timestamp: "2026-01-02T03:04:06.000Z",
      message: { role: "assistant", content },
    }));
  }
  await writeFile(join(sessionDir, "tool-heavy.jsonl"), lines.join("\n"));

  const result = await callBackend("chatState", root, { sessionId: "tool-heavy" }, { HOME: home });
  assert.ok(JSON.stringify(result).length < 70000);
  assert.ok(result.messages.length > 0);
  assert.ok(result.messages.every((message) => !message.toolCalls || message.toolCalls.length <= 100));
});

test("chatState caps response session ids and synthesized tool ids", async () => {
  const root = await mkdtemp(join(tmpdir(), "pi-web-chat-workspace-"));
  const home = await mkdtemp(join(tmpdir(), "pi-web-chat-home-"));
  const safe = `--${root.replace(/^\/+/, "").replace(/[\\/:]/g, "-")}--`;
  const sessionDir = join(home, ".pi", "agent", "sessions", safe);
  await mkdir(sessionDir, { recursive: true });
  const longID = "s".repeat(100000);
  await writeFile(join(sessionDir, "long-session.jsonl"), [
    JSON.stringify({ type: "session", id: longID }),
    JSON.stringify({
      type: "message",
      id: "m".repeat(500),
      timestamp: "2026-01-02T03:04:06.000Z",
      message: { role: "assistant", content: [{ type: "toolCall", name: "n".repeat(500), arguments: {} }] },
    }),
    JSON.stringify({
      type: "message",
      id: "r1",
      timestamp: "2026-01-02T03:04:07.000Z",
      message: { role: "toolResult", toolName: "n".repeat(500), content: "should not merge without id" },
    }),
  ].join("\n"));

  const result = await callBackend("chatState", root, { sessionId: longID }, { HOME: home });
  assert.equal(result.activeSessionId.length, 160);
  assert.equal(result.messages[0].toolCalls[0].id.length, 160);
  assert.equal(result.messages[0].toolCalls[0].name.length, 120);
  assert.equal(result.messages[0].toolCalls[0].status, "running");
  assert.equal(result.messages[0].toolCalls[0].argsStatus, "empty");
  assert.equal(result.messages.at(-1).role, "tool");
  assert.ok(JSON.stringify(result).length < 70000);
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

test("runShell caps backend output before returning JSON", async () => {
  const root = await mkdtemp(join(tmpdir(), "pi-web-chat-"));
  const result = await callBackend("runShell", root, { command: "yes x | head -c 70000" });
  assert.equal(result.truncated, true);
  assert.ok(Buffer.byteLength(result.output, "utf8") <= 64 * 1024);
});
