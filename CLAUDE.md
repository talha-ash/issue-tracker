# Issue Tracker - Monorepo

## Overview

A fully responsive Issue Tracker web application inspired by Linear/Plane. Built as a monorepo with two frontend apps (for learning purposes) sharing a common UI package.

## Tech Stack

- **Monorepo**: pnpm workspaces (`pnpm@10.30.2`)
- **Node**: 22.16.0 (via Volta)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4 + shadcn/ui (new-york style)
- **UI Components**: Radix UI primitives, Lucide icons, class-variance-authority, tailwind-merge
- **Testing**: Vitest + Testing Library + jsdom

## Architecture Flow

```
browser → client pkg → RPC (app-level) → backend pkg → repo pkg (Supabase)
```

- **`client`** — browser-side hooks, API calls, client-side business logic. No framework-specific APIs.
- **RPC layer** — app-level glue: `createServerFn` (TanStack Start) or `'use server'` (Next.js). Lives in apps, calls into `backend`.
- **`backend`** — server-side logic: validation, handlers. No React. Called from RPC layer.
- **`repo`** — sole Supabase communication. Every function receives a `DbClient` as first param.

## Package Dependency Rules

```
repo      ← no internal deps
backend   ← @issue-tracker/repo
client    ← @issue-tracker/repo  (+ @issue-tracker/backend for types only)
ui        ← no internal deps
apps      ← ui, backend, client, repo
```

## Project Structure

```
issue-tracker/
├── apps/
│   ├── next-app/          # Next.js 16 app (@issue-tracker/next-app)
│   └── tanstart-app/      # TanStack Start app (@issue-tracker/tanstart-app)
├── packages/
│   ├── ui/                # Shared UI components (@issue-tracker/ui)
│   ├── repo/              # Data access layer (@issue-tracker/repo)
│   ├── backend/           # Server-side logic (@issue-tracker/backend)
│   └── client/            # Browser-side logic (@issue-tracker/client)
├── package.json           # Root - shared deps hoisted here
├── pnpm-workspace.yaml
└── tsconfig.json          # Root TS config
```

## Apps

### Next.js App (`apps/next-app`)

- Next.js 16 (App Router)
- **WARNING**: This Next.js version has breaking changes vs training data. Always read `node_modules/next/dist/docs/` before writing code.
- Scripts: `pnpm dev`, `pnpm build`, `pnpm start`, `pnpm lint`

### TanStack Start App (`apps/tanstart-app`)

- TanStack Start + TanStack Router + Vite
- Uses `#/*` import alias for `./src/*`
- Scripts: `pnpm dev` (port 3000), `pnpm build`, `pnpm test`

## Packages

### `repo` (`packages/repo`)

- Package: `@issue-tracker/repo`
- Sole communication layer with Supabase. Every function receives a `DbClient` as the first param.
- Entry points:
  - `@issue-tracker/repo/backend` → `src/backend.ts` — backend Supabase functions only
  - `@issue-tracker/repo/client` → `src/client.ts` — client Supabase functions only
  - `@issue-tracker/repo/shared` → `src/shared/index.ts` — shared types (`ActionState`, `DbClient`, `Database`)

### `backend` (`packages/backend`)

- Package: `@issue-tracker/backend`
- Server-side logic. **No React code.**
- File structure: `src/feature/<domain>/<feature>/` with `handler.ts`, `service.ts`, `types.ts`, `validationSchemas.ts`
- Validation schema files are named `validationSchemas.ts` (not `validations.ts`)
- Exports handlers and types from root entry point `@issue-tracker/backend`

### `client` (`packages/client`)

- Package: `@issue-tracker/client`
- Browser-side hooks, API calls, client-side business logic.
- **No framework-specific APIs** (`createServerFn`, `useRouter`, etc.) — those stay in apps.

### `ui` (`packages/ui`)

- Package: `@issue-tracker/ui`
- Generic reusable components. No feature logic.
- Entry points:
  - `@issue-tracker/ui/components` → `src/components/index.ts`
  - `@issue-tracker/ui/lib` → `src/lib/index.ts`
- Contains 50+ shadcn/ui components (button, dialog, table, sidebar, etc.)
- Global CSS: `src/global.css`
- shadcn config: `components.json` (new-york style, CSS variables, lucide icons)

## Commands

```bash
# Install dependencies
pnpm install

# Build all packages (required before running apps)
pnpm build:packages

# Run apps
pnpm --filter @issue-tracker/next-app dev
pnpm --filter @issue-tracker/tanstart-app dev

# Run individual package in watch mode
pnpm dev:repo
pnpm dev:backend
pnpm dev:client

# Typecheck everything
pnpm typecheck

# Run tests
pnpm --filter @issue-tracker/tanstart-app test
```

## Design System

### Colors

- Primary: `indigo-600` / hover `indigo-700`
- Danger: `red-500` / outlined `border-red-300 text-red-600`
- Success: `green-500`
- Warning: `amber-500`
- Sidebar: `gray-900` bg, `gray-100` text, `gray-400` muted
- Main bg: `gray-50`
- Cards: `white` with `border-gray-200`

### Component Patterns

- Primary button: `bg-indigo-600 text-white rounded-lg px-4 py-2 hover:bg-indigo-700`
- Outlined button: `border border-gray-300 text-gray-700 rounded-lg px-4 py-2 hover:bg-gray-50`
- Inputs: `border border-gray-300 rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-indigo-500`
- Cards: `bg-white rounded-xl border border-gray-200 shadow-sm p-6`
- Badges: `inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium`
- Sidebar: `w-64` fixed, full height

### Status Colors

- Open: `indigo` (bg-indigo-100 text-indigo-700)
- In Progress: `amber` (bg-amber-100 text-amber-700)
- Resolved: `green` (bg-green-100 text-green-700)
- Closed: `gray` (bg-gray-100 text-gray-600)

### Priority Colors

- Urgent: red, High: orange, Medium: yellow, Low: gray

## App Pages

| Page           | File             | Sidebar Context                                    |
| -------------- | ---------------- | -------------------------------------------------- |
| Login          | `login`          | None (full-page centered)                          |
| Sign Up        | `signup`         | None (full-page centered)                          |
| Issue List     | `issues`         | Issue List View (back btn + project name + issues) |
| Issue Detail   | `issue-detail`   | Issue List View (current issue highlighted)        |
| Project Create | `project-create` | Project List View                                  |
| Project Detail | `project-detail` | Project List View (tabs: Issues, Members)          |
| Project Update | `project-update` | Project List View                                  |

## Sidebar Behavior

The sidebar is context-aware:

1. **Project List View** — shown outside a specific project (dashboard, project pages). Shows app logo, project list with 3-dot menus, user info.
2. **Issue List View** — shown inside a project (issue list, issue detail). Shows back button, project name, scrollable issue list, user info.

## Conventions

- UI components live in `packages/ui/src/components/ui/`
- Utility functions in `packages/ui/src/lib/utils.ts`
- Root `tsconfig.json` is the base config; packages and apps extend it
- Backend feature files follow: `src/feature/<domain>/<feature>/{handler,service,types,validationSchemas}.ts`
- Validation schema files are always named `validationSchemas.ts`
- RPC files (`createServerFn`, server actions) are **app-level only** — they call into `@issue-tracker/backend`
- `repo/backend` is restricted to `backend` package; `repo/client` is restricted to `client` package (enforced by ESLint `no-restricted-imports`)
- Apps import `Database`, `DbClient`, `ActionState` from `@issue-tracker/backend` — never directly from `@issue-tracker/repo`

## Get Package Skill md

You are an AI assistant helping a developer set up skill-to-task mappings for their project.

Follow these steps in order:

1. CHECK FOR EXISTING MAPPINGS
   Search the project's agent config files (AGENTS.md, CLAUDE.md, .cursorrules,
   .github/copilot-instructions.md) for a block delimited by:
     <!-- intent-skills:start -->
     <!-- intent-skills:end -->
   - If found: show the user the current mappings, keep that file as the source of truth,
     and ask "What would you like to update?" Then skip to step 4 with their requested changes.
   - If not found: continue to step 2.

2. DISCOVER AVAILABLE SKILLS
   Run: `npx @tanstack/intent@latest list`
   This outputs each skill's name, description, full path, and whether it was found in
   project-local node_modules or accessible global node_modules.
   This works best in Node-compatible environments (npm, pnpm, Bun, or Deno npm interop
   with node_modules enabled).

3. SCAN THE REPOSITORY
   Build a picture of the project's structure and patterns:
   - Read package.json for library dependencies
   - Survey the directory layout (src/, app/, routes/, components/, api/, etc.)
   - Note recurring patterns (routing, data fetching, auth, UI components, etc.)

   Based on this, propose 3-5 skill-to-task mappings. For each one explain:
   - The task or code area (in plain language the user would recognise)
   - Which skill applies and why

   Then ask: "What other tasks do you commonly use AI coding agents for?
   I'll create mappings for those too."
   Also ask: "I'll default to AGENTS.md unless you want another supported config file.
   Do you have a preference?"

4. WRITE THE MAPPINGS BLOCK
   Once you have the full set of mappings, write or update the agent config file.
   - If you found an existing intent-skills block, update that file in place.
   - Otherwise prefer AGENTS.md by default, unless the user asked for another supported file.

   Use this exact block:

<!-- intent-skills:start -->

# Skill mappings - when working in these areas, load the linked skill file into context.

skills:

- task: "describe the task or code area here"
load: "node_modules/package-name/skills/skill-name/SKILL.md"
<!-- intent-skills:end -->

Rules:

- Use the user's own words for task descriptions
- Include the exact path from `npx @tanstack/intent@latest list` output so agents can load it directly
- Paths should use the stable `node_modules/<package-name>/skills/...` format (no version numbers)
- If a skill path from `list` contains package-manager-internal directories (e.g. `.pnpm/`, `.bun/`)
  with version numbers, it is a transitive dependency without a stable top-level symlink.
  For these skills, do NOT embed the versioned path. Instead, add a comment telling the agent
  how to locate the skill at runtime:
  - task: "describe the task"
    # To load this skill, run: npx @tanstack/intent@latest list | grep <skill-name>
- Keep entries concise - this block is read on every agent task
- Preserve all content outside the block tags unchanged
- If the user is on Deno, note that this setup is best-effort today and relies on npm interop
