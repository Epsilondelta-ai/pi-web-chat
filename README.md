# pi-web-chat

Trusted local pi-web plugin that moves chat/composer trigger behavior into a plugin package.

## Features

- `!` shell commands: uses the plugin backend `runShell` method and renders results as chat tool messages.
- `/` slash commands: registers plugin commands and merges them with pi-web workspace commands.
- `@` file references: searches workspace files through the plugin backend and attaches referenced text files before submit.
- Chat/composer host integration: patches `<pi-app>` methods on activate and restores them on deactivate.

## Install

In pi-web: **Settings → Plugins → local** and select this folder.

```json
{
  "id": "pi-web-chat",
  "name": "Chat Composer",
  "version": "0.1.1",
  "entry": "index.js",
  "backend": "backend.js"
}
```

`entry` and `backend` both stay inside this plugin folder, matching the pi-web plugin contract.

## Source layout

- `src/` — TypeScript browser plugin source.
- `index.js` — bundled browser entry generated from `src/index.ts`.
- `backend.go` — Go backend for commands, file search/read/context resolution, and shell execution.
- `backend.js` — Node wrapper that launches the prebuilt Go backend binary.
- `bin/<os>-<arch>/pi-web-chat-backend` — prebuilt backend binaries.
- `test/` — Node test suite for backend behavior and frontend plugin patching.
- `scripts/validate.js` — manifest/entry/backend validation.
- `scripts/security-scan.js` — local static secret/shell-boundary scan.

## Build

The browser entry is authored in TypeScript under `src/` and bundled to the manifest entry `index.js`.

```sh
npm run build
npm run typecheck
```

Rebuild backend binaries from `backend.go` with:

```sh
npm run build:backend
```

## Backend API

The backend receives `method` and `workspaceRoot` from pi-web and JSON on stdin.

- `commands` → `{ commands }`
- `searchFiles` with `{ query, limit }` → `{ files }`
- `readFile` with `{ path }` → `{ file }`
- `resolveContext` with `{ text, refs }` → `{ refs, attachments, errors }`
- `runShell` with `{ command, timeoutMs }` → `{ output, exitCode, durationMs, truncated }`

Supported prebuilt targets:

- `darwin-amd64`
- `darwin-arm64`
- `linux-amd64`
- `linux-arm64`

## Safety

- Workspace-relative path resolution rejects traversal and NUL bytes.
- Binary and oversized files are rejected.
- Shell execution runs in the workspace root with timeout and output cap.
- `npm run security:deps` runs `bun audit`.
- `npm run security:static` runs the local static scan.

## Verify

```sh
npm run check
```

`npm run check` runs build, TypeScript typecheck, backend/frontend tests, dependency/static security scans, and plugin validation.
