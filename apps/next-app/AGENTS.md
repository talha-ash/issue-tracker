# Next.js App — Agent Instructions

See CLAUDE.md (root) for full project context.

## App Structure

- Framework: Next.js 16 (App Router)
- WARNING: This Next.js version has breaking changes. Read `node_modules/next/dist/docs/` before writing code.

## Backend Integration Pattern

Apps create a `Backend` instance and pass it to handlers. The `Backend` is created from a Supabase client.

### Creating Backend (server-side)

```typescript
// lib/backend.ts
import { createBackend } from '@issue-tracker/backend/server';
import { createServerSupabaseClient } from './lib/supabase/server';

export async function createBackendClient() {
  return createBackend(await createServerSupabaseClient());
}
```

### Using Backend in Actions

```typescript
// app/actions/auth.ts
'use server';
import { createBackendClient } from '@/lib/backend';
import { authHandlers } from '@issue-tracker/server';

export async function loginAction(_prev, formData: FormData) {
  const backend = await createBackendClient();
  return authHandlers.loginHandler(backend, {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  });
}
```

## Key Files

```
lib/
├── backend.ts              # createBackendClient() async factory
└── supabase/
    ├── client.ts          # getBrowserSupabaseClient() for browser
    ├── server.ts          # createServerSupabaseClient() for server
    └── context.tsx        # Supabase context provider

app/
├── actions/
│   ├── auth.ts            # loginAction, signupAction
│   └── projects.ts       # createProjectAction
├── login/page.tsx
├── signup/page.tsx
└── project-create/page.tsx
```

## Constraint

Import `Backend` types via `@issue-tracker/backend/server`. Never import `DbClient` directly in app code — use `Backend` instead.

## See Also

- CLAUDE.md (root) — full project context
- packages/backend/AGENTS.md — Backend interface
- packages/server/AGENTS.md — Handler patterns
