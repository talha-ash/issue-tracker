# @issue-tracker/backend — Agent Instructions

## Package Purpose

Abstraction layer over database/Auth providers. Provides `createBackend(client: DbClient)` factory that returns a `Backend` instance bound to a specific session.

## Entry Points

- `@issue-tracker/backend/server` → `src/index.ts` — server-side exports including `createBackend`
- `@issue-tracker/backend/shared` → `src/shared/index.ts` — shared types (`ActionState`, `DbClient`, `Backend`, `User`, `Session`, `Database`, `Tables*`)

## Core Concept

```typescript
// In handlers/apps, create backend from supabase client:
import { createBackend } from '@issue-tracker/backend/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';

const backend = createBackend(createServerSupabaseClient());
// Pass backend to handlers, NOT the raw client
authHandlers.loginHandler(backend, { email, password });
```

## Backend Interface

`Backend` has two contexts:

- `backend.auth` — authentication methods: `signIn()`, `signUp()`, `signOut()`, `getCurrentUser()`
- `backend.projects` — project methods: `fetchProjects()`, `fetchActiveProjects()`, `createProject()`

Methods do NOT take `client` as argument — they use the bound client from `createBackend(client)`.

## File Structure

```
src/
├── index.ts              # createBackend factory + re-exports
├── context/
│   ├── auth.ts           # auth context (signIn, signUp, signOut, getCurrentUser)
│   └── projects.ts       # projects context (fetchProjects, fetchActiveProjects, createProject)
└── shared/
    ├── index.ts          # re-exports from shared/
    ├── client.ts         # DbClient type (SupabaseClient<Database>)
    ├── action-state.ts   # ActionState type
    ├── auth-types.ts     # User, Session types
    └── database.types.ts  # Database, Tables, TablesInsert, etc.
```

## Key Constraints

- `backend/server` entry restricted to `server` package and apps
- `backend/shared` can be imported from anywhere
- Handlers should call `backend.auth.*` / `backend.projects.*` NOT direct supabase methods
- To swap backend (Supabase → Firebase/custom), implement new `createBackend()` in this package

## See Also

- CLAUDE.md (root) — full project context
- packages/server/AGENTS.md — handler patterns
