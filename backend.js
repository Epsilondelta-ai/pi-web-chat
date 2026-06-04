#!/usr/bin/env node
import { constants, createReadStream } from "node:fs";
import { access, readFile, readdir, stat } from "node:fs/promises";
import { basename, extname, isAbsolute, relative, resolve, sep } from "node:path";
import { spawn } from "node:child_process";

const MAX_FILE_BYTES = 256 * 1024;
const MAX_OUTPUT_BYTES = 512 * 1024;
const DEFAULT_TIMEOUT_MS = 30_000;
const MAX_SEARCH_RESULTS = 30;
const SKIP_DIRS = new Set([".git", "node_modules", "dist", "build", "coverage", ".next", ".astro", ".pi", ".pi-web"]);
const TEXT_EXTENSIONS = new Set([
  ".astro", ".c", ".cc", ".conf", ".cpp", ".css", ".csv", ".go", ".h", ".hpp", ".html", ".java",
  ".js", ".json", ".jsx", ".kt", ".md", ".mdx", ".mjs", ".py", ".rs", ".sh", ".sql", ".svelte",
  ".toml", ".ts", ".tsx", ".txt", ".vue", ".xml", ".yaml", ".yml",
]);

export const CHAT_SLASH_COMMANDS = [
  {
    command: "/chat-help",
    description: "Show pi-web chat plugin commands and trigger help.",
    scope: "plugin",
    source: "pi-web-chat",
    template: "Explain the pi-web chat plugin triggers: ! for shell, / for commands, and @ for file references.",
  },
  {
    command: "/chat-context",
    description: "Ask pi to summarize the selected @ file references before answering.",
    scope: "plugin",
    source: "pi-web-chat",
    template: "Summarize the referenced files first, then answer my request:\n\n",
  },
  {
    command: "/chat-review",
    description: "Review referenced files or recent chat context for risks and fixes.",
    scope: "plugin",
    source: "pi-web-chat",
    template: "Review the referenced files and list concrete risks, fixes, and verification steps:\n\n",
  },
];

export function parseJsonInput(value) {
  if (!value.trim()) return {};
  const parsed = JSON.parse(value);
  return parsed && typeof parsed === "object" ? parsed : {};
}

export function extractFileRefs(text) {
  const refs = [];
  const seen = new Set();
  const pattern = /(^|[\s`])@([^\s@`]+)/g;
  let match;
  while ((match = pattern.exec(String(text || ""))) !== null) {
    const prefix = match[1] || "";
    if (prefix === "`") continue;
    const ref = match[2].trim();
    if (!ref || seen.has(ref)) continue;
    seen.add(ref);
    refs.push(ref);
  }
  return refs;
}

export function isPathInside(root, target) {
  const rel = relative(root, target);
  return rel === "" || (!rel.startsWith("..") && !rel.includes(`..${sep}`) && !isAbsolute(rel));
}

export function safePath(workspaceRoot, relPath) {
  const root = resolve(workspaceRoot || ".");
  const clean = String(relPath || "").replace(/^@/, "").replace(/^\/+/, "");
  if (!clean || clean.includes("\0")) throw new Error("invalid path");
  const target = resolve(root, clean);
  if (!isPathInside(root, target)) throw new Error("path escapes workspace");
  return target;
}

export function isLikelyText(buffer, filePath = "") {
  if (TEXT_EXTENSIONS.has(extname(filePath).toLowerCase())) return true;
  if (buffer.includes(0)) return false;
  const sample = buffer.subarray(0, Math.min(buffer.length, 4096));
  let suspicious = 0;
  for (const byte of sample) {
    if (byte === 9 || byte === 10 || byte === 13) continue;
    if (byte < 32 || byte > 126) suspicious += 1;
  }
  return sample.length === 0 || suspicious / sample.length < 0.08;
}

export async function readWorkspaceTextFile(workspaceRoot, relPath) {
  const target = safePath(workspaceRoot, relPath);
  const info = await stat(target);
  if (!info.isFile()) throw new Error("path is not a file");
  if (info.size > MAX_FILE_BYTES) throw new Error(`file too large: ${info.size} bytes`);
  const buffer = await readFile(target);
  if (!isLikelyText(buffer, target)) throw new Error("binary file is not supported");
  const rel = relative(resolve(workspaceRoot || "."), target).replaceAll(sep, "/");
  return {
    type: "file",
    name: basename(target),
    path: rel,
    mimeType: mimeTypeForPath(target),
    content: buffer.toString("utf8"),
    size: info.size,
  };
}

export async function searchWorkspaceFiles(workspaceRoot, query = "", limit = MAX_SEARCH_RESULTS) {
  const root = resolve(workspaceRoot || ".");
  const needle = String(query || "").toLowerCase();
  const max = Math.max(1, Math.min(Number(limit) || MAX_SEARCH_RESULTS, 100));
  const out = [];
  await walk(root);
  return out;

  async function walk(dir) {
    if (out.length >= max) return;
    let entries = [];
    try {
      entries = await readdir(dir, { withFileTypes: true });
    } catch {
      return;
    }
    entries.sort((left, right) => left.name.localeCompare(right.name));
    for (const entry of entries) {
      if (out.length >= max) return;
      if (entry.name.startsWith(".") && entry.name !== ".github") continue;
      if (entry.isDirectory() && SKIP_DIRS.has(entry.name)) continue;
      const full = resolve(dir, entry.name);
      if (!isPathInside(root, full)) continue;
      const rel = relative(root, full).replaceAll(sep, "/");
      const haystack = `${entry.name}\n${rel}`.toLowerCase();
      if (entry.isFile() && (!needle || haystack.includes(needle))) {
        out.push({ type: "file", name: entry.name, path: rel });
      }
      if (entry.isDirectory()) await walk(full);
    }
  }
}

export function slashCommands() {
  return { commands: CHAT_SLASH_COMMANDS };
}

export async function resolvePromptContext(workspaceRoot, input) {
  const explicitRefs = Array.isArray(input.refs) ? input.refs : [];
  const refs = [...new Set([...explicitRefs, ...extractFileRefs(input.text || "")])];
  const attachments = [];
  const errors = [];
  for (const ref of refs.slice(0, 20)) {
    try {
      attachments.push(await readWorkspaceTextFile(workspaceRoot, ref));
    } catch (error) {
      errors.push({ path: ref, error: error instanceof Error ? error.message : String(error) });
    }
  }
  return { refs, attachments, errors };
}

export async function runShellCommand(workspaceRoot, input) {
  const command = String(input.command || "").trim();
  if (!command) throw new Error("command required");
  const cwd = resolve(workspaceRoot || ".");
  await access(cwd, constants.R_OK | constants.X_OK);
  const timeoutMs = Math.max(1000, Math.min(Number(input.timeoutMs) || DEFAULT_TIMEOUT_MS, 120_000));
  const started = Date.now();
  const shell = process.platform === "win32" ? "cmd.exe" : "/bin/sh";
  const args = process.platform === "win32" ? ["/d", "/s", "/c", command] : ["-lc", command];
  const child = spawn(shell, args, { cwd, env: process.env, stdio: ["ignore", "pipe", "pipe"] });
  let output = "";
  let truncated = false;
  const append = (chunk) => {
    if (output.length >= MAX_OUTPUT_BYTES) {
      truncated = true;
      return;
    }
    output += chunk.toString("utf8");
    if (output.length > MAX_OUTPUT_BYTES) {
      output = output.slice(0, MAX_OUTPUT_BYTES);
      truncated = true;
    }
  };
  child.stdout.on("data", append);
  child.stderr.on("data", append);
  const timer = setTimeout(() => child.kill("SIGTERM"), timeoutMs);
  const exitCode = await new Promise((resolveExit, rejectExit) => {
    child.on("error", rejectExit);
    child.on("close", (code, signal) => resolveExit(signal ? 124 : code ?? 0));
  });
  clearTimeout(timer);
  return { output, exitCode, durationMs: Date.now() - started, truncated };
}

export async function handle(method, workspaceRoot, input) {
  if (method === "commands") return slashCommands();
  if (method === "searchFiles") return { files: await searchWorkspaceFiles(workspaceRoot, input.query, input.limit) };
  if (method === "readFile") return { file: await readWorkspaceTextFile(workspaceRoot, input.path) };
  if (method === "resolveContext") return resolvePromptContext(workspaceRoot, input);
  if (method === "runShell") return runShellCommand(workspaceRoot, input);
  throw new Error(`unknown method: ${method}`);
}

function mimeTypeForPath(filePath) {
  const ext = extname(filePath).toLowerCase();
  if ([".md", ".markdown"].includes(ext)) return "text/markdown";
  if ([".json"].includes(ext)) return "application/json";
  if ([".js", ".mjs", ".cjs", ".ts", ".tsx", ".jsx"].includes(ext)) return "text/javascript";
  if ([".html", ".htm"].includes(ext)) return "text/html";
  if ([".css"].includes(ext)) return "text/css";
  return "text/plain";
}

async function readStdin() {
  const chunks = [];
  for await (const chunk of process.stdin) chunks.push(chunk);
  return Buffer.concat(chunks).toString("utf8");
}

async function main() {
  const [, , method, workspaceRoot = "."] = process.argv;
  try {
    const input = parseJsonInput(await readStdin());
    const result = await handle(method, workspaceRoot, input.data && typeof input.data === "object" ? input.data : input);
    process.stdout.write(`${JSON.stringify(result)}\n`);
  } catch (error) {
    process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
    process.exit(1);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  await main();
}
