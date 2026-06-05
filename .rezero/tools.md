# Re:ZERO Tools

<!-- rezero-init: v0.1.0 -->

## Detected Stack

- pi-web plugin package: `plugin.json` with browser `entry` and optional `backend`.
- JavaScript/TypeScript frontend: `src/**/*.ts`, bundled by Bun to `index.js`.
- Go backend: `backend.go`, built by `scripts/build-backends.sh` to `bin/<os>-<arch>/pi-web-chat-backend`.
- Node test suite: `node --test` tests in `test/`.

## Installed/Configured

- Typhon: TypeScript typecheck — `npm run typecheck`.
- Minerva: Build/test/manifest suite — `npm run check`.
- Daphne: Dependency/build hygiene — `bun install`, `bun.lock`, package scripts.
- Satella: Backend safety tests — `npm test` covers traversal, binary rejection, shell exit capture.

## Skipped

- SonarQube — not required for this small local plugin; native typecheck/test/validate are configured.
- Playwright/Lighthouse/axe — no standalone browser route or visual page fixture in this plugin.
- CodeQL/Gitleaks/Trivy/OSV — not installed by default; can be added if release policy requires it.

## Local Services

- None.

## Required Environment

- Bun available for bundling TypeScript.
- Go available for rebuilding backend binaries.
- No SaaS tokens required.
