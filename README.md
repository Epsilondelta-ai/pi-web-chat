# pi-web-chat

Trusted local pi-web chat feature plugin.

This plugin follows the modern pi-web plugin standard: pi-web core supplies `context.mount.chat`, `context.mount.composer`, `context.app`, and optional shared RxJS subjects. The plugin owns the mounted chat surface, composer, local session cache, backend prompt submission, and pi-web-sidebar synchronization.

## Features

- Modern-only activation through `context.mount.chat` and `context.mount.composer`; no legacy host DOM injection.
- Sidebar RxJS integration when `globalThis.piWeb` is available:
  - consumes `plugin.pi-web-sidebar.selectedSession`
  - emits `plugin.pi-web-sidebar.event`
- pi-web-sidebar integration through live `globalThis.piWebSidebar` / `app.piWebSidebar` snapshots and selection channels.
- Mounted chat state follows sidebar selected-session changes through backend `sessionEventsSse` streams.
- Chat-created/adopted sessions publish sidebar-compatible events without directly mutating sidebar `selectedSession$`.
- Local chat/session persistence in `localStorage`.
- Prompt triggers:
  - Type `!` at the start and press Space to enter yellow shell-command mode for the workspace.
    Queued file attachments are hidden while shell mode is active and reappear for the next normal prompt.
  - Type `@` to list project files and pick one to tag as prompt context.
  - Type `/` at the start to open the slash command list.

## Install

In pi-web: **Settings → Plugins → local** and select this folder.

```json
{
  "id": "pi-web-chat",
  "name": "Chat Composer",
  "version": "0.1.3",
  "entry": "index.js",
  "backend": "backend.js"
}
```

`entry` and `backend` both stay inside this plugin folder.

## Source layout

- `src/index.ts` — modern browser plugin entry, mounted lifecycle, sidebar adapter, and backend chat orchestration.
- `src/dom.ts` — mounted chat/composer DOM, rendering, and styles.
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
- `chatState` with `{ sessionId, workspacePath }` → `{ activeSessionId, messages, runId, isStreaming }`; empty `sessionId` returns an empty state
- `startPrompt` with `{ text, attachments, sessionId, workspacePath }` → `{ accepted, runId, activeSessionId, isStreaming }`
- `steerPrompt` with `{ runId, text, attachments }` → `{ accepted, runId, activeSessionId, isStreaming }`
- `streamEvents` with `{ runId, cursor }` → `{ events, cursor, activeSessionId, isStreaming }`
- `sessionEventsSse` with `{ sessionId, workspacePath }` → SSE `chat.state` frames for session transcript state
- `streamEventsSse` with `{ runId, cursor, workspacePath }` → SSE `event:`/`data:` frames for the same chat events
- `abortPrompt` with `{ runId }` → `{ aborted, runId }`
- `submitPrompt` with `{ text, attachments, sessionId, workspacePath }` → `{ accepted, activeSessionId, messages, isStreaming }`
- `runShell` with `{ command, timeoutMs }` → `{ output, exitCode, durationMs, truncated }`

Supported prebuilt targets:

- `darwin-amd64`
- `darwin-arm64`
- `linux-amd64`
- `linux-arm64`

## Safety

- Workspace-relative path resolution rejects traversal and NUL bytes.
- Binary and oversized files are rejected.
- Shell execution runs in the workspace root with timeout and a 64 KiB backend output cap before frontend rendering.
- Frontend cleanup removes mounted plugin DOM, clears mounted CSS/badge state, and unsubscribes RxJS subscriptions.
- `npm run security:deps` runs `bun audit`.
- `npm run security:static` runs the local static scan.

## Verify

```sh
npm run check
```

`npm run check` runs build, TypeScript typecheck, backend/frontend tests, dependency/static security scans, and plugin validation.
