# pi-web-chat

Trusted local pi-web chat feature plugin.

This plugin follows the pi-web plugin standard: pi-web core supplies plugin lifecycle, stable DOM hooks, and the shared `piWeb` RxJS Subject registry. The plugin owns the chat surface, composer, local sessions, slash commands, file references, shell tool messages, and plugin settings UI.

## Features

- Chat/composer UI appended to `.main[data-main]`; no `<pi-app>` method patching.
- Shared RxJS channels:
  - `chat.input`
  - `chat.input.submitted`
  - `session.activeId`
  - `toast.requested`
- `/` slash commands loaded from the plugin backend and rendered by the plugin.
- `@` file references searched and resolved through the plugin backend.
- `!` shell commands executed through the Go backend and rendered as tool messages.
- Local chat/session persistence in `localStorage`.
- Toolbar and settings extensions through `[data-plugin-toolbar]` and `[data-plugin-settings-root]` when present.

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

`entry` and `backend` both stay inside this plugin folder.

## Source layout

- `src/index.ts` — browser plugin entry, lifecycle, channel binding, feature orchestration.
- `src/dom.ts` — plugin-owned DOM, rendering, and styles.
- `src/types.ts` — pi-web/RxJS declarations and plugin data contracts.
- `index.js` — bundled browser entry generated from `src/index.ts`.
- `backend.go` — Go backend for commands, file search/read/context resolution, and shell execution.
- `backend.js` — Node launcher for the prebuilt Go backend binary.
- `bin/<os>-<arch>/pi-web-chat-backend` — prebuilt backend binaries.
- `test/` — Node test suite for backend behavior and frontend plugin lifecycle/channel behavior.
- `scripts/validate.js` — manifest/entry/backend validation.
- `scripts/security-scan.js` — local static secret/shell-boundary scan.

## Build

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
- Frontend cleanup removes plugin-created DOM and unsubscribes RxJS subscriptions.
- `npm run security:deps` runs `bun audit`.
- `npm run security:static` runs the local static scan.

## Verify

```sh
npm run check
```

`npm run check` runs build, TypeScript typecheck, backend/frontend tests, dependency/static security scans, and plugin validation.
