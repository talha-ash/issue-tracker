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

## Project Structure

```
issue-tracker/
├── apps/
│   ├── next-app/          # Next.js 16 app (@issue-tracker/next-app)
│   └── tanstart-app/      # TanStack Start app (@issue-tracker/tanstart-app)
├── packages/
│   └── ui/                # Shared UI components (@issue-tracker/ui)
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

## Shared UI Package (`packages/ui`)

- Package: `@issue-tracker/ui`
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

# Run apps
pnpm --filter @issue-tracker/next-app dev
pnpm --filter @issue-tracker/tanstart-app dev

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

| Page | File | Sidebar Context |
|------|------|-----------------|
| Login | `login` | None (full-page centered) |
| Sign Up | `signup` | None (full-page centered) |
| Issue List | `issues` | Issue List View (back btn + project name + issues) |
| Issue Detail | `issue-detail` | Issue List View (current issue highlighted) |
| Project Create | `project-create` | Project List View |
| Project Detail | `project-detail` | Project List View (tabs: Issues, Members) |
| Project Update | `project-update` | Project List View |

## Sidebar Behavior

The sidebar is context-aware:
1. **Project List View** — shown outside a specific project (dashboard, project pages). Shows app logo, project list with 3-dot menus, user info.
2. **Issue List View** — shown inside a project (issue list, issue detail). Shows back button, project name, scrollable issue list, user info.

## Conventions

- Both apps consume `@issue-tracker/ui` as a workspace dependency
- UI components live in `packages/ui/src/components/ui/`
- Utility functions in `packages/ui/src/lib/utils.ts`
- Root `tsconfig.json` is the base config; apps extend it
