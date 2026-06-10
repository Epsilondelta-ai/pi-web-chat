#!/usr/bin/env node
import {
  appendFileSync,
  chmodSync,
  closeSync,
  existsSync,
  mkdirSync,
  openSync,
  readdirSync,
  readFileSync,
  readSync,
  realpathSync,
  statSync,
  renameSync,
  rmSync,
  unlinkSync,
  writeFileSync,
} from "node:fs";
import { dirname, isAbsolute, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawn, spawnSync } from "node:child_process";
import { randomUUID } from "node:crypto";

const dir = dirname(realpathSync(fileURLToPath(import.meta.url)));
const method = process.argv[2] || "";
const workspaceRoot = process.argv[3] || ".";
const completedRunTtlMs = 15 * 60 * 1000;
const staleRunTtlMs = 60 * 60 * 1000;
const maxResponseSessionIdLength = 160;
const maxToolArgsBytes = 1000;

if (method === "__streamRunner") {
  await runStreamRunner(process.argv.slice(3));
  process.exit(0);
}

if (["startPrompt", "streamEvents", "streamEventsSse", "sessionEventsSse", "abortPrompt"].includes(method)) {
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
    if (name === "streamEventsSse") {
      await streamEventsSse(data);
      return;
    }

    if (name === "sessionEventsSse") {
      await sessionEventsSse(root, data);
      return;
    }

    const result = name === "startPrompt" ? startPrompt(root, data) : name === "streamEvents" ? streamEvents(data) : abortPrompt(data);
    process.stdout.write(`${JSON.stringify(result)}\n`);
  } catch (error) {
    process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
    process.exit(1);
  }
}

function responseSessionId(value) {
  return String(value || "").slice(0, maxResponseSessionIdLength);
}

function parseInput(value) {
  const trimmed = value.trim();
  if (!trimmed) return {};
  return JSON.parse(trimmed);
}

function startPrompt(root, data) {
  root = promptWorkspaceRoot(root, data);
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
  return { accepted: true, runId, activeSessionId: responseSessionId(session.sessionId), isStreaming: true };
}

function streamEvents(data) {
  const state = readRunState(String(data.runId || ""));
  const cursor = Number(data.cursor || 0);
  const events = readEvents(state.eventsPath).filter((event) => Number(event.seq || 0) > cursor);
  const nextCursor = events.reduce((max, event) => Math.max(max, Number(event.seq || 0)), cursor);
  const isStreaming = state.status === "running" || state.status === "starting";
  return { runId: state.runId, activeSessionId: responseSessionId(state.activeSessionId), events, cursor: nextCursor, isStreaming };
}

async function streamEventsSse(data) {
  let cursor = Number(data.cursor || 0);
  process.stdout.write(": pi-web-chat\n\n");

  while (true) {
    const response = streamEvents({ ...data, cursor });
    cursor = response.cursor;

    for (const event of response.events) {
      process.stdout.write(`event: ${sseEventName(event.type)}\n`);
      process.stdout.write(`data: ${JSON.stringify(event)}\n\n`);
    }

    if (!response.isStreaming) return;
    await sleep(120);
  }
}

async function sessionEventsSse(root, data) {
  const binary = resolveBinary();
  if (!existsSync(binary)) throw new Error(`Unsupported platform or missing backend binary: ${process.platform}/${process.arch}`);

  try {
    chmodSync(binary, 0o755);
  } catch {
    // Already executable or installed on a read-only filesystem.
  }

  await new Promise((resolve, reject) => {
    const child = spawn(binary, ["sessionEventsSse", root], { stdio: ["pipe", "pipe", "pipe"] });
    let settled = false;
    const cleanup = () => {
      process.removeListener("SIGTERM", stop);
      process.removeListener("SIGINT", stop);
      process.stdout.removeListener("error", stop);
      process.stdout.removeListener("close", stop);
    };
    const stop = () => {
      if (child.exitCode === null) child.kill("SIGTERM");
    };
    const settle = (callback, value) => {
      if (settled) return;
      settled = true;
      cleanup();
      callback(value);
    };

    process.once("SIGTERM", stop);
    process.once("SIGINT", stop);
    process.stdout.once("error", stop);
    process.stdout.once("close", stop);
    child.stdout.pipe(process.stdout);
    child.stderr.pipe(process.stderr);
    child.on("error", (error) => settle(reject, error));
    child.on("close", (code) => {
      if (code && code !== 0) settle(reject, new Error(`sessionEventsSse exited with code ${code}`));
      else settle(resolve, undefined);
    });
    child.stdin.end(JSON.stringify({ data }));
  });
}

function sseEventName(value) {
  return String(value || "message").replace(/[^A-Za-z0-9_.-]/g, "_");
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
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
  let settled = false;
  const finish = (status, code = 0) => {
    if (settled) return;
    settled = true;
    process.removeListener("SIGTERM", abort);
    process.removeListener("SIGINT", abort);
    emit({ type: "run.end", runId, exitCode: code });
    const current = safeReadJson(statePath) || {};
    writeJsonAtomic(statePath, { ...current, status, updatedAt: Date.now(), completedAt: Date.now() });
    resolve(undefined);
  };
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
  proc.on("error", (error) => {
    emit({ type: "error", message: error.message });
    finish("complete", 1);
  });
  proc.on("close", (code) => {
    const current = safeReadJson(statePath) || {};
    const status = aborted || current.status === "aborted" ? "aborted" : "complete";
    finish(status, code ?? 0);
  });
  proc.stdin?.end(`${JSON.stringify({ id: runId, type: "prompt", message: prompt })}\n`);
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
    else if (delta.type === "toolcall_start") emit(toolCallStreamEvent("tool.start", delta));
    else if (delta.type === "toolcall_delta") emit({ type: "tool.delta", toolCallId: delta.toolCallId || delta.id || "", delta: String(delta.delta || "") });
    else if (delta.type === "toolcall_end") emit(toolCallStreamEvent("tool.end", delta));
    else emit({ type: "message.event", event: delta.type || "update" });
    return;
  }

  if (event.type === "tool_execution_start") {
    const { args, argsStatus } = toolArgsFromSources(event);
    emit({ type: "tool.start", toolCallId: event.toolCallId, toolName: event.toolName, args, argsStatus });
  }
  else if (event.type === "tool_execution_update") emit({ type: "tool.delta", toolCallId: event.toolCallId, toolName: event.toolName, delta: toolResultText(event.partialResult) });
  else if (event.type === "tool_execution_end") emit({ type: "tool.end", toolCallId: event.toolCallId, toolName: event.toolName, result: toolResultText(event.result), isError: Boolean(event.isError) });
  else if (event.type === "agent_start") emit({ type: "run.agent.start" });
  else if (event.type === "agent_end") emit({ type: "run.agent.end" });
}

function toolCallStreamEvent(type, delta) {
  const toolCall = delta.toolCall && typeof delta.toolCall === "object" ? delta.toolCall : {};
  const { args, argsStatus } = toolArgsFromSources(toolCall, delta);
  return { type, toolCallId: toolCall.id || delta.id || "", toolName: toolCall.name || delta.name || "tool", args, argsStatus };
}

function toolArgsFromSources(...sources) {
  for (const source of sources) {
    if (!source || typeof source !== "object") continue;
    for (const key of ["input", "arguments", "args"]) {
      if (source[key] && typeof source[key] === "object" && !Array.isArray(source[key])) return trimToolArgs(source[key]);
    }
  }

  return { args: {}, argsStatus: "unavailable" };
}

function trimToolArgs(args) {
  if (Object.keys(args).length === 0) return { args, argsStatus: "empty" };
  let data = "";
  try {
    data = JSON.stringify(args);
  } catch {
    return { args: { _truncated: true }, argsStatus: "truncated" };
  }
  if (Buffer.byteLength(data, "utf8") <= maxToolArgsBytes) return { args, argsStatus: "present" };
  return { args: { _truncated: true }, argsStatus: "truncated" };
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
  const primaryDir = configuredSessionDir(root);
  if (!primaryDir) throw new Error("session directory escapes workspace");
  const dirs = sessionDirs(root);
  mkdirSync(primaryDir, { recursive: true, mode: 0o700 });
  if (requestedSessionId) {
    for (const dirPath of dirs) {
      const existing = findSessionFile(dirPath, requestedSessionId);
      if (existing) return { sessionId: requestedSessionId, sessionFile: existing };
    }
  }
  const sessionId = randomUUID();
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const sessionFile = join(primaryDir, `${stamp}_${sessionId}.jsonl`);
  writeFileSync(sessionFile, `${JSON.stringify({ type: "session", version: 3, id: sessionId, timestamp: new Date().toISOString(), cwd: root })}\n`, { mode: 0o600 });
  return { sessionId, sessionFile };
}

function findSessionFile(dirPath, sessionId) {
  try {
    for (const entry of readdirSync(dirPath, { withFileTypes: true })) {
      const path = join(dirPath, entry.name);
      if (entry.isDirectory()) {
        const nested = findSessionFile(path, sessionId);
        if (nested) return nested;
        continue;
      }
      if (!entry.name.endsWith(".jsonl")) continue;

      try {
        const header = JSON.parse(readFirstLine(path));
        if (header?.type === "session" && header?.id === sessionId) return path;
      } catch {
        // Ignore malformed session files and keep scanning.
      }
    }
  } catch {
    return null;
  }
  return null;
}

function readFirstLine(path) {
  const fd = openSync(path, "r");
  try {
    const buffer = Buffer.alloc(4096);
    const bytes = readSync(fd, buffer, 0, buffer.length, 0);
    return buffer.subarray(0, bytes).toString("utf8").split("\n", 1)[0] || "";
  } finally {
    closeSync(fd);
  }
}

function promptWorkspaceRoot(root, data) {
  const workspacePath = typeof data.workspacePath === "string" ? data.workspacePath.trim() : "";
  if (!workspacePath) return root;

  try {
    if (!statSync(workspacePath).isDirectory()) return root;
    if (realpathSync(workspacePath) === realpathSync(root)) return workspacePath;
  } catch {
    return root;
  }

  const requestedSessionId = String(data.sessionId || "");
  if (!requestedSessionId) return root;

  for (const dirPath of sessionDirs(workspacePath)) {
    if (findSessionFile(dirPath, requestedSessionId)) return workspacePath;
  }

  return root;
}

function sessionDirs(root) {
  const safe = `--${root.replace(/^\/+/, "").replace(/[\\/:]/g, "-")}--`;
  return uniquePaths([
    configuredSessionDir(root),
    join(homeDir(), ".pi", "agent", "sessions", safe),
  ]);
}

function configuredSessionDir(root) {
  const fallback = safeSessionDir(root, join(root, ".pi", "sessions"));
  try {
    const settings = JSON.parse(readFileSync(join(root, ".pi", "settings.json"), "utf8"));
    const hasSessionDir = settings && Object.prototype.hasOwnProperty.call(settings, "sessionDir");
    const sessionDir = hasSessionDir ? settings.sessionDir : "";
    if (typeof sessionDir !== "string" || !sessionDir.trim()) return fallback;
    const resolved = isAbsolute(sessionDir) ? resolve(sessionDir) : resolve(root, sessionDir);
    return safeSessionDir(root, resolved) || fallback;
  } catch {
    return fallback;
  }
}

function safeSessionDir(root, path) {
  return isPathInside(root, path) && isRealPathInside(root, path) ? resolve(path) : "";
}

function isPathInside(root, path) {
  const rel = relative(resolve(root), resolve(path));
  return rel === "" || (rel !== ".." && !rel.startsWith(`..${pathSeparator()}`) && !isAbsolute(rel));
}

function isRealPathInside(root, path) {
  try {
    const rootReal = realpathSync(root);
    const existing = nearestExistingPath(path);
    const existingReal = realpathSync(existing);
    const targetReal = resolve(existingReal, relative(existing, path));
    return isPathInside(rootReal, targetReal);
  } catch {
    return false;
  }
}

function nearestExistingPath(path) {
  let current = resolve(path);
  while (!existsSync(current)) {
    const parent = dirname(current);
    if (parent === current) break;
    current = parent;
  }
  return current;
}

function pathSeparator() {
  return process.platform === "win32" ? "\\" : "/";
}

function uniquePaths(paths) {
  const seen = new Set();
  return paths.filter((path) => {
    if (!path) return false;
    const key = resolve(path);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
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
