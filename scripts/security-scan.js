import { readdir, readFile } from "node:fs/promises";
import { join, relative } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const ignoredDirectories = new Set([".git", ".pi", ".rezero", "bin", "coverage", "node_modules"]);
const textExtensions = new Set([".go", ".js", ".json", ".md", ".ts", ".tsx", ".yml", ".yaml"]);
const findings = [];

const checks = [
  { id: "secret-api-key", pattern: /(?:api[_-]?key|token|secret|password)\s*[:=]\s*["'][A-Za-z0-9_./+=-]{20,}["']/i },
  { id: "private-key", pattern: /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/ },
  { id: "dynamic-eval", pattern: /\b(?:eval|Function)\s*\(/ },
  { id: "shell-child-process", pattern: /node:child_process|from ["']child_process["']|require\(["']child_process["']\)/ },
];

await scanDirectory(root);

if (findings.length > 0) {
  console.error(findings.join("\n"));
  process.exit(1);
}

console.log("security scan passed");

async function scanDirectory(directory) {
  const entries = await readdir(directory, { withFileTypes: true });

  for (const entry of entries) {
    const path = join(directory, entry.name);
    const name = entry.name;

    if (entry.isDirectory()) {
      if (!ignoredDirectories.has(name)) {
        await scanDirectory(path);
      }

      continue;
    }

    if (entry.isFile() && shouldScan(name)) {
      await scanFile(path);
    }
  }
}

async function scanFile(path) {
  const content = await readFile(path, "utf8");
  const displayPath = relative(root, path);
  const lines = content.split("\n");

  for (const [index, line] of lines.entries()) {
    for (const check of checks) {
      if (isAllowed(displayPath, check.id, line)) {
        continue;
      }

      if (check.pattern.test(line)) {
        findings.push(`${displayPath}:${index + 1} ${check.id}`);
      }
    }
  }
}

function shouldScan(name) {
  return [...textExtensions].some((extension) => name.endsWith(extension));
}

function isAllowed(path, id, line) {
  if (path === "scripts/security-scan.js") {
    return true;
  }

  if (["backend.js", "test/backend.test.js"].includes(path) && id === "shell-child-process") {
    return true;
  }

  if (path === "backend.go" && id === "shell-child-process" && line.includes("exec.CommandContext")) {
    return true;
  }

  if (path === "README.md" && id === "shell-child-process") {
    return true;
  }

  return false;
}
