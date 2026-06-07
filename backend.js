#!/usr/bin/env node
import {
  appendFileSync,
  chmodSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  realpathSync,
  renameSync,
  rmSync,
  unlinkSync,
  writeFileSync,
} from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { spawn, spawnSync } from "node:child_process";
import { randomUUID } from "node:crypto";

const dir = dirname(realpathSync(fileURLToPath(import.meta.url)));
const method = process.argv[2] || "";
const workspaceRoot = process.argv[3] || ".";
const completedRunTtlMs = 15 * 60 * 1000;
const staleRunTtlMs = 60 * 60 * 1000;

if (method === "__streamRunner") {
  await runStreamRunner(process.argv.slice(3));
  process.exit(0);
}

if (["startPrompt", "streamEvents", "abortPrompt"].includes(method)) {
  await handleStreamingMethod(method, workspaceRoot);
  process.exit(0);
}

const binary = resolveBinary();

if (!existsSync(binary)) {
  process.stderr.write(`Unsupported platform or missing backend binary: ${process.platform}/${process.arch}\n`);
  process.stderr.write(`Expected binary at: ${binary}\n`);
  process.stderr.write("Run: npm run build:backend\n");
  process.exit(1);
}

try {
  chmodSync(binary, 0o755);
} catch {
  // Already executable or installed on a read-only filesystem.
}

const run = spawnSync(binary, process.argv.slice(2), {
  encoding: "utf8",
  input: await readStdin(),
  maxBuffer: 1024 * 1024 * 32,
});

if (run.error) {
  process.stderr.write(`Failed to execute backend binary: ${run.error.message}\n`);
  process.exit(1);
}

process.stdout.write(run.stdout || "");
process.stderr.write(run.stderr || "");
process.exit(run.status ?? 1);

function resolveBinary() {
  const os = { darwin: "darwin", linux: "linux" }[process.platform];
  const arch = { x64: "amd64", arm64: "arm64" }[process.arch];
  if (!os || !arch) return join(dir, "bin", "unsupported", "pi-web-chat-backend");
  return join(dir, "bin", `${os}-${arch}`, "pi-web-chat-backend");
}

async function readStdin() {
  const chunks = [];
  for await (const chunk of process.stdin) chunks.push(chunk);
  return Buffer.concat(chunks).toString("utf8");
}

async function handleStreamingMethod(name, root) {
  try {
    pruneRuns();
    const input = parseInput(await readStdin());
    const data = input.data && typeof input.data === "object" ? input.data : input;
    const result = name === "startPrompt" ? startPrompt(root, data) : name === "streamEvents" ? streamEvents(data) : abortPrompt(data);
    process.stdout.write(`${JSON.stringify(result)}\n`);
  } catch (error) {
    process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
    process.exit(1);
  }
}

function parseInput(value) {
  const trimmed = value.trim();
  if (!trimmed) return {};
  return JSON.parse(trimmed);
}

function startPrompt(root, data) {
  const text = mergePromptAttachments(String(data.text || ""), data.attachments);
  if (!text.trim()) throw new Error("text is required");

  const runId = randomUUID();
  mkdirSync(runRoot(), { recursive: true, mode: 0o700 });
  const statePath = runStatePath(runId);
  const eventsPath = join(runRoot(), `${runId}.events.jsonl`);
  const promptPath = join(runRoot(), `${runId}.prompt.txt`);
  const session = resolveSession(root, String(data.sessionId || ""));

  writeFileSync(promptPath, text, { mode: 0o600 });
  writeFileSync(eventsPath, "", { mode: 0o600 });
  writeJsonAtomic(statePath, {
    runId,
    activeSessionId: session.sessionId,
    sessionFile: session.sessionFile,
    eventsPath,
    promptPath,
    status: "starting",
    cursor: 0,
    pid: null,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  });

  const child = spawn(process.execPath, [realpathSync(fileURLToPath(import.meta.url)), "__streamRunner", runId, root, session.sessionFile, statePath, eventsPath, promptPath], {
    cwd: root,
    detached: true,
    stdio: "ignore",
  });
  child.unref();

  writeJsonAtomic(statePath, { ...readJson(statePath), pid: child.pid, status: "running", updatedAt: Date.now() });
  return { accepted: true, runId, activeSessionId: session.sessionId, isStreaming: true };
}

function streamEvents(data) {
  const state = readRunState(String(data.runId || ""));
  const cursor = Number(data.cursor || 0);
  const events = readEvents(state.eventsPath).filter((event) => Number(event.seq || 0) > cursor);
  const nextCursor = events.reduce((max, event) => Math.max(max, Number(event.seq || 0)), cursor);
  const isStreaming = state.status === "running" || state.status === "starting";
  return { runId: state.runId, activeSessionId: state.activeSessionId, events, cursor: nextCursor, isStreaming };
}

function abortPrompt(data) {
  const state = readRunState(String(data.runId || ""));
  if (state.childPid) {
    try {
      process.kill(Number(state.childPid), "SIGTERM");
    } catch {
      // Child already exited.
    }
  }
  if (state.pid) {
    try {
      process.kill(-Number(state.pid), "SIGTERM");
    } catch {
      try {
        process.kill(Number(state.pid), "SIGTERM");
      } catch {
        // Process already exited.
      }
    }
  }
  removeFile(runPromptPath(state.runId));
  writeJsonAtomic(runStatePath(state.runId), { ...state, status: "aborted", updatedAt: Date.now() });
  return { aborted: true, runId: state.runId };
}

async function runStreamRunner(args) {
  await new Promise((resolve) => runStreamRunnerProcess(args, resolve));
}

function runStreamRunnerProcess(args, resolve) {
  const [runId, root, sessionFile, statePath, eventsPath, promptPath] = args;
  let seq = 0;
  const emit = (event) => {
    seq += 1;
    appendFileSync(eventsPath, `${JSON.stringify({ seq, time: Date.now(), ...event })}\n`);
    const current = safeReadJson(statePath) || {};
    const ended = event.type === "run.end";
    const status = current.status === "aborted" ? "aborted" : ended ? "complete" : current.status || "running";
    writeJsonAtomic(statePath, { ...current, cursor: seq, status, updatedAt: Date.now() });
  };

  const prompt = readFileSync(promptPath, "utf8");
  removeFile(promptPath);
  const proc = spawn("pi", ["--session", sessionFile, "--mode", "rpc"], { cwd: root, stdio: ["pipe", "pipe", "pipe"] });
  writeJsonAtomic(statePath, { ...(safeReadJson(statePath) || {}), childPid: proc.pid, updatedAt: Date.now() });
  let buffer = "";
  let aborted = false;
  const abort = () => {
    aborted = true;
    try {
      proc.kill("SIGTERM");
    } catch {
      // Child already exited.
    }
    const current = safeReadJson(statePath) || {};
    writeJsonAtomic(statePath, { ...current, status: "aborted", updatedAt: Date.now(), completedAt: Date.now() });
  };
  process.once("SIGTERM", abort);
  process.once("SIGINT", abort);

  emit({ type: "run.start", runId });
  proc.stdout.on("data", (chunk) => {
    buffer += chunk.toString("utf8");
    while (true) {
      const index = buffer.indexOf("\n");
      if (index < 0) break;
      const line = buffer.slice(0, index).replace(/\r$/, "");
      buffer = buffer.slice(index + 1);
      if (line.trim()) mapRpcLine(line, emit);
    }
  });
  proc.stderr.on("data", (chunk) => emit({ type: "error", message: chunk.toString("utf8") }));
  proc.on("close", (code) => {
    process.removeListener("SIGTERM", abort);
    process.removeListener("SIGINT", abort);
    emit({ type: "run.end", runId, exitCode: code ?? 0 });
    const current = safeReadJson(statePath) || {};
    const status = aborted || current.status === "aborted" ? "aborted" : "complete";
    writeJsonAtomic(statePath, { ...current, status, updatedAt: Date.now(), completedAt: Date.now() });
    resolve(undefined);
  });
  proc.stdin.end(`${JSON.stringify({ id: runId, type: "prompt", message: prompt })}\n`);
}

function mapRpcLine(line, emit) {
  let event;
  try {
    event = JSON.parse(line);
  } catch {
    emit({ type: "error", message: line });
    return;
  }

  if (event.type === "response") {
    emit({ type: "response", command: event.command, success: Boolean(event.success), error: event.error });
    return;
  }

  if (event.type === "message_update") {
    const delta = event.assistantMessageEvent || {};
    if (delta.type === "text_delta") emit({ type: "text.delta", delta: String(delta.delta || "") });
    else if (delta.type === "thinking_delta") emit({ type: "thinking.delta", delta: String(delta.delta || "") });
    else if (delta.type === "toolcall_start") emit({ type: "tool.start", toolCallId: delta.toolCall?.id || delta.id || "", toolName: delta.toolCall?.name || delta.name || "tool", args: delta.toolCall?.arguments || {} });
    else if (delta.type === "toolcall_delta") emit({ type: "tool.delta", toolCallId: delta.toolCallId || delta.id || "", delta: String(delta.delta || "") });
    else if (delta.type === "toolcall_end") emit({ type: "tool.end", toolCallId: delta.toolCall?.id || delta.id || "", toolName: delta.toolCall?.name || delta.name || "tool", args: delta.toolCall?.arguments || {} });
    else emit({ type: "message.event", event: delta.type || "update" });
    return;
  }

  if (event.type === "tool_execution_start") emit({ type: "tool.start", toolCallId: event.toolCallId, toolName: event.toolName, args: event.args || {} });
  else if (event.type === "tool_execution_update") emit({ type: "tool.delta", toolCallId: event.toolCallId, toolName: event.toolName, delta: toolResultText(event.partialResult) });
  else if (event.type === "tool_execution_end") emit({ type: "tool.end", toolCallId: event.toolCallId, toolName: event.toolName, result: toolResultText(event.result), isError: Boolean(event.isError) });
  else if (event.type === "agent_start") emit({ type: "run.agent.start" });
  else if (event.type === "agent_end") emit({ type: "run.agent.end" });
}

function toolResultText(result) {
  const content = Array.isArray(result?.content) ? result.content : [];
  return content.map((item) => typeof item?.text === "string" ? item.text : "").filter(Boolean).join("\n");
}

function mergePromptAttachments(text, raw) {
  if (!Array.isArray(raw) || raw.length === 0) return text;
  let out = text;
  raw.forEach((attachment, index) => {
    const content = typeof attachment?.content === "string" ? attachment.content : "";
    if (!content.trim()) return;
    const name = attachment.name || attachment.path || "attachment";
    out += `\n\n<attachment index="${index + 1}">\nFile: ${name}\n\n${content}\n</attachment>`;
  });
  return out;
}

function resolveSession(root, requestedSessionId) {
  const dirPath = sessionDir(root);
  mkdirSync(dirPath, { recursive: true, mode: 0o700 });
  if (requestedSessionId) {
    const existing = findSessionFile(dirPath, requestedSessionId);
    if (existing) return { sessionId: requestedSessionId, sessionFile: existing };
  }
  const sessionId = randomUUID();
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const sessionFile = join(dirPath, `${stamp}_${sessionId}.jsonl`);
  writeFileSync(sessionFile, `${JSON.stringify({ type: "session", version: 3, id: sessionId, timestamp: new Date().toISOString(), cwd: root })}\n`, { mode: 0o600 });
  return { sessionId, sessionFile };
}

function findSessionFile(dirPath, sessionId) {
  try {
    const name = readdirSync(dirPath).find((item) => item.endsWith(".jsonl") && item.includes(sessionId));
    return name ? join(dirPath, name) : null;
  } catch {
    return null;
  }
}

function sessionDir(root) {
  const safe = `--${root.replace(/^\/+/, "").replace(/[\\/:]/g, "-")}--`;
  return join(homeDir(), ".pi", "agent", "sessions", safe);
}

function runRoot() {
  return join(homeDir(), ".pi", "web-chat", "runs");
}

function runStatePath(runId) {
  if (!isRunId(runId)) throw new Error("invalid runId");
  return join(runRoot(), `${runId}.json`);
}

function readRunState(runId) {
  if (!runId) throw new Error("runId is required");
  const state = safeReadJson(runStatePath(runId));
  if (!state) throw new Error("run state not found");
  if (state.runId !== runId) throw new Error("run state mismatch");
  return state;
}

function isRunId(value) {
  return typeof value === "string" && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);
}

function readEvents(path) {
  if (!existsSync(path)) return [];
  const lines = readFileSync(path, "utf8").split("\n").filter(Boolean);
  const events = [];
  for (const line of lines) {
    try {
      events.push(JSON.parse(line));
    } catch {
      break;
    }
  }
  return events;
}

function readJson(path) {
  const value = safeReadJson(path);
  if (!value) throw new Error(`invalid JSON file: ${path}`);
  return value;
}

function safeReadJson(path) {
  try {
    return JSON.parse(readFileSync(path, "utf8"));
  } catch {
    return null;
  }
}

function writeJsonAtomic(path, data) {
  const tmp = `${path}.${process.pid}.${Date.now()}.tmp`;
  writeFileSync(tmp, `${JSON.stringify(data)}\n`, { mode: 0o600 });
  renameSync(tmp, path);
}

function pruneRuns() {
  const root = runRoot();
  if (!existsSync(root)) return;
  const now = Date.now();
  for (const name of readdirSync(root)) {
    if (!name.endsWith(".json")) continue;
    const path = join(root, name);
    const state = safeReadJson(path);
    const fileRunId = name.slice(0, -5);
    if (!isRunId(fileRunId)) continue;
    if (!state) {
      removeRunFiles(fileRunId);
      continue;
    }
    const age = now - Number(state.updatedAt || state.createdAt || 0);
    const completed = state.status === "complete" || state.status === "aborted";
    if (completed) removeFile(runPromptPath(fileRunId));
    if ((completed && age > completedRunTtlMs) || age > staleRunTtlMs) removeRunFiles(fileRunId);
  }
}

function runPromptPath(runId) {
  if (!isRunId(runId)) throw new Error("invalid runId");
  return join(runRoot(), `${runId}.prompt.txt`);
}

function removeRunFiles(runId) {
  if (!isRunId(runId)) return;
  for (const suffix of [".json", ".events.jsonl", ".prompt.txt"]) removeFile(join(runRoot(), `${runId}${suffix}`));
}

function removeFile(path) {
  if (!path) return;
  try {
    rmSync(path, { force: true });
  } catch {
    try {
      unlinkSync(path);
    } catch {
      // Already removed.
    }
  }
}

function homeDir() {
  return process.env.HOME || process.env.USERPROFILE || ".";
}
