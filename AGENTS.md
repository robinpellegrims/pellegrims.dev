# AGENTS.md

This file provides implementation guidance for coding agents working in this repository.

## Scope

- Repository: `pellegrims.dev` (Nx monorepo)
- Main app: `apps/pellegrims-dev` (Next.js, Pages Router)
- Shared libraries: `libs/ui/*`, `libs/markdown`

## Prerequisites

- Use `pnpm` for dependency management (`pnpm-lock.yaml` is present).
- Run commands from repository root unless a task explicitly requires otherwise.

## Core Commands

```bash
# Main app
nx dev pellegrims-dev
nx build pellegrims-dev
nx lint pellegrims-dev
nx test pellegrims-dev

# Libraries / e2e
nx test ui-atoms
nx e2e pellegrims-dev-e2e

# Workspace-wide
nx affected:test
nx format:check
nx format:write
```

## Architecture Notes

- Stack: Next.js 15, React 19, TypeScript 5, Tailwind CSS 3, Nx 21.
- App routing is in `apps/pellegrims-dev/pages` (Pages Router conventions).
- UI follows atomic design layers in `libs/ui/{atoms,molecules,organisms,templates}`.
- Markdown/content utilities are in `libs/markdown`.

## Import Conventions

Prefer workspace aliases over relative deep paths.

```typescript
import { Button } from '@pellegrims-dev/ui/atoms';
import { Header } from '@pellegrims-dev/ui/organisms';
```

## Content and Assets

- Blog content: `apps/pellegrims-dev/content/blog`
- Snippets: `apps/pellegrims-dev/content/snippets`
- Public assets: `apps/pellegrims-dev/public/assets`
- RSS output: `apps/pellegrims-dev/public/rss`

## Contact API and Environment

Contact API handler: `apps/pellegrims-dev/pages/api/contact.ts`.

Required environment variables:

- `SMTP_PORT`
- `SMTP_HOST`
- `SMTP_USER`
- `SMTP_PASS`
- `SMTP_DKIM_DOMAIN`
- `SMTP_DKIM_KEY_SELECTOR`
- `SMTP_DKIM_PRIVATE_KEY`
- `CONTACT_MAIL_TO`

If any are missing, the API returns HTTP 500.

## Testing Guidance

- Unit and integration tests use Jest and React Testing Library.
- E2E tests use Cypress (`apps/pellegrims-dev-e2e`).
- Prefer targeted tests first, then broaden only when needed.

## Agent Working Rules

- Keep changes focused and minimal; avoid unrelated refactors.
- Do not include AI attribution or co-author footers in commits.
- Do not edit generated RSS files unless the task explicitly requires content regeneration.
- If documentation is unclear, consult official project/library docs before guessing.
