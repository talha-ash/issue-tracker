# TanStack Start App — Agent Instructions

See CLAUDE.md (root) for full project context and conventions.

## App Structure

- Framework: TanStack Start + TanStack Router + Vite
- Import alias: `#/*` → `./src/*`
- Port: 3000

## Backend Integration Pattern

Apps create a `Backend` instance and pass it to handlers. The `Backend` is created from a Supabase client.

### Creating Backend (server-side)

```typescript
// src/lib/backend.ts
import { createBackend } from '@issue-tracker/backend/server';
import { createServerSupabaseClient } from './lib/supabase/server';

export function createBackendClient() {
  return createBackend(createServerSupabaseClient());
}
```

### Using Backend in RPCs

```typescript
// src/feature/login/rpc.ts
import { createBackendClient } from '#/lib/backend';
import { authHandlers } from '@issue-tracker/server';

export const loginFn = createServerFn({ method: 'POST' }).handler(
  async ({ data }) => {
    const backend = createBackendClient();
    return authHandlers.loginHandler(backend, { email, password });
  }
);
```

## Key Files

```
src/
├── lib/
│   ├── backend.ts           # createBackendClient() factory
│   └── supabase/
│       ├── client.ts        # getBrowserSupabaseClient() for browser
│       └── server.ts        # createServerSupabaseClient() for server
├── feature/
│   ├── login/rpc.ts         # loginFn server function
│   ├── signup/rpc.ts        # signupFn server function
│   └── createProject/rpc.ts # createProjectFn server function
└── routes/                  # TanStack Router file-based routes
```

## Constraint

Import `Backend` types via `@issue-tracker/backend/server`. Never import `DbClient` directly in app code — use `Backend` instead.

## See Also

- apps/tanstart-app/skills/\* — TanStack Start/Router skill files
- packages/backend/AGENTS.md — Backend interface
- packages/server/AGENTS.md — Handler patterns
