# AGENTS.md

This file provides implementation guidance for coding agents working in this repository.

## Scope

- Repository: `pellegrims.dev` (standard Next.js app)
- Main app: repository root (Next.js, Pages Router)
- Shared UI and utilities: `components/ui/*`, `lib/markdown`

## Prerequisites

- Use `pnpm` for dependency management (`pnpm-lock.yaml` is present).
- Run commands from repository root unless a task explicitly requires otherwise.

## Core Commands

```bash
pnpm dev
pnpm build
pnpm lint
pnpm test
pnpm typecheck
```

## Architecture Notes

- Stack: Next.js 16, React 19, TypeScript 5, Tailwind CSS 3.
- App routing is in `pages` (Pages Router conventions).
- UI follows atomic design layers in `components/ui/{atoms,molecules,organisms,templates}`.
- Markdown/content utilities are in `lib/markdown`.

## Import Conventions

Prefer workspace aliases over relative deep paths.

```typescript
import { Button } from '@/components/ui/atoms/button/button';
import { Header } from '@/components/ui/organisms/header/header';
```

## Content and Assets

- Blog content: `content/blog`
- Snippets: `content/snippets`
- Public assets: `public/assets`
- RSS output: `public/rss`

## Contact API and Environment

Contact API handler: `pages/api/contact.ts`.

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
- Prefer targeted tests first, then broaden only when needed.

## Agent Working Rules

- Keep changes focused and minimal; avoid unrelated refactors.
- Do not include AI attribution or co-author footers in commits.
- Do not edit generated RSS files unless the task explicitly requires content regeneration.
- If documentation is unclear, consult official project/library docs before guessing.
