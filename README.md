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
  "version": "0.1.0",
  "entry": "index.js",
  "backend": "backend.js"
}
```

## Backend methods

The backend script receives `method` and `workspaceRoot` from pi-web and JSON on stdin.

- `commands` → `{ commands }`
- `searchFiles` with `{ query, limit }` → `{ files }`
- `readFile` with `{ path }` → `{ file }`
- `resolveContext` with `{ text, refs }` → `{ refs, attachments, errors }`
- `runShell` with `{ command, timeoutMs }` → `{ output, exitCode, durationMs, truncated }`

## Safety

- Workspace-relative path resolution rejects traversal and NUL bytes.
- Binary and oversized files are rejected.
- Shell execution runs in the workspace root with timeout and output cap.

## Verify

```sh
npm test
npm run validate
```
