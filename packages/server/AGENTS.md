# @issue-tracker/server — Agent Instructions

## Package Purpose

Server-side handlers for auth and projects. No React code. Called from app RPCs/actions.

## Hexagonal Architecture

```
browser → client pkg → RPC (app-level) → server pkg → backend pkg (Supabase)
```

**Core principle**: Server defines ports (what it needs), backend implements them.

## Port Pattern

Each handler defines its own `port.ts` declaring only the methods it requires:

```
src/feature/
├── auth/
│   ├── login/
│   │   ├── handler.ts
│   │   └── port.ts          # AuthSignInPort
│   └── signup/
│       ├── handler.ts
│       └── port.ts          # AuthSignUpPort
└── projects/
    ├── getProjects/
    │   ├── handler.ts
    │   └── port.ts          # ProjectsFetchPort
    ├── getActiveProjects/
    │   ├── handler.ts
    │   └── port.ts          # ProjectsFetchActivePort
    └── createProject/
        ├── handler.ts
        └── port.ts          # AuthGetCurrentUserPort + ProjectsCreatePort
```

Handler factory receives the narrowed port type — TypeScript structurally verifies the backend fulfills the contract.

## Handler Pattern

```typescript
// Handler defines its port
import type { AuthSignInPort } from './port.js';

export function createLoginHandler(backend: AuthSignInPort) {
  return async function loginHandler(input: LoginInput): Promise<LoginState> {
    const result = await backend.signIn(email, password);
    // ...
  };
}
```

## Entry Point (`src/index.ts`)

```typescript
import type { Backend } from '@issue-tracker/backend/server';
import { createAuthHandlers } from './feature/auth/index.js';
import { createProjectsHandlers } from './feature/projects/index.js';

export function createHandlers(backend: Backend) {
  return {
    authHandlers: createAuthHandlers(backend),
    projectsHandlers: createProjectsHandlers(backend),
  };
}
```

The factory functions in `feature/*/index.ts` narrow the `Backend` to the specific ports each handler needs.

## File Structure

```
src/
├── index.ts                              # createHandlers factory + re-exports
├── feature/
│   ├── auth/
│   │   ├── index.ts                     # createAuthHandlers (narrows Backend)
│   │   ├── login/
│   │   │   ├── handler.ts              # createLoginHandler
│   │   │   ├── port.ts                 # AuthSignInPort
│   │   │   ├── service.ts
│   │   │   ├── types.ts
│   │   │   └── validationSchemas.ts
│   │   └── signup/
│   │       ├── handler.ts
│   │       ├── port.ts                 # AuthSignUpPort
│   │       ├── service.ts
│   │       ├── types.ts
│   │       └── validationSchemas.ts
│   └── projects/
│       ├── index.ts                     # createProjectsHandlers (narrows Backend)
│       ├── getProjects/
│       │   ├── handler.ts
│       │   └── port.ts                 # ProjectsFetchPort
│       ├── getActiveProjects/
│       │   ├── handler.ts
│       │   └── port.ts                 # ProjectsFetchActivePort
│       └── createProject/
│           ├── handler.ts
│           ├── port.ts                 # AuthGetCurrentUserPort + ProjectsCreatePort
│           ├── service.ts
│           ├── types.ts
│           └── validationSchemas.ts
└── shared/
    └── result.ts
```

## Port Types (what handlers need)

```typescript
// auth
AuthSignInPort:    { signIn(email, password): Result<{ user, session }> }
AuthSignUpPort:    { signUp(email, password, fullname): Result<{ user, session }> }
AuthGetCurrentUserPort: { getCurrentUser(): Result<User> }

// projects
ProjectsFetchPort:        { fetchProjects(): Result<Project[]> }
ProjectsFetchActivePort:  { fetchActiveProjects(): Result<Project[]> }
ProjectsCreatePort:       { createProject(payload): Result<Project> }
```

## Key Constraints

- Each handler folder has its own `port.ts` defining only what that handler needs
- Handler factories receive the narrowed port type
- `feature/*/index.ts` narrows `Backend` to the specific ports before passing to handlers
- Never call `backend.auth.*` or `backend.projects.*` inside handlers — use the port methods directly

## See Also

- CLAUDE.md (root) — full project context
- packages/backend/AGENTS.md — Backend interface details
