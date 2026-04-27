# Testing Notes

## Next.js App — E2E with Cypress + MSW

### MSW runs server-side via instrumentation

MSW is started from `apps/next-app/instrumentation.ts` when `NEXT_RUNTIME === 'nodejs'`.
This means it intercepts `fetch` calls made by the Next.js server process —
including calls from server actions, route handlers, and the proxy (middleware).

Browser-side fetches are **not** intercepted by this setup. The Service Worker
flow is not used because we only need to mock server-to-Supabase traffic.

Handlers live in `apps/next-app/mocks/node.ts`.

### Supabase auth mocking — the full flow

When a test submits the login form:

1. Server action calls `supabase.auth.signInWithPassword(...)`
2. Supabase SDK → `POST /auth/v1/token?grant_type=password` (intercepted by MSW)
3. `@supabase/ssr` writes the session cookie `sb-<project>-auth-token`
   — value is `base64-<base64url(JSON.stringify(session))>`
4. Server action `redirect("/")`
5. Proxy runs on `/`, calls `getClaims()` → `getSession()` reads the cookie
6. `getClaims()` decodes the JWT locally, then:
   - For **HS256** or JWTs without a `kid` → falls back to `getUser(token)` →
     `GET /auth/v1/user` (must also be mocked)
   - For **RS256** with `kid` → fetches JWKS to verify locally (not used here)

### Why the mock `access_token` must be a valid JWT

An arbitrary string like `'mock-access-token'` will pass the login step,
but the proxy then calls `getClaims()` which runs `decodeJWT()` on the token.
Invalid structure → `getClaims()` returns `null` → proxy redirects to `/login`.

The mock builds a proper `header.payload.signature` (base64url) with:

- `alg: 'HS256'` (forces fallback to `getUser()`, skips JWKS)
- `exp` in the future (passes `validateExp`)
- `sub`, `email`, `role`, etc. matching what Supabase would normally issue

The signature doesn't need to be cryptographically valid — HS256 path skips
verification in favor of the `getUser()` roundtrip, which MSW also handles.

### What NOT to mock

- Do **not** attempt to set the `sb-*-auth-token` cookie directly from Cypress.
  Test the real login flow end-to-end so that session-writing logic in
  `@supabase/ssr` is also exercised.
- Do not mock browser-side fetches — server actions run on the server, so the
  Node MSW server is the correct interception point.

### Public routes and the proxy

`apps/next-app/proxy.ts` defines `PUBLIC_ROUTES` — an array of path prefixes
that bypass auth. Add a route here when it should be reachable without a session
(e.g. `/login`, `/signup`, `/auth`, `/about`). Changes to `proxy.ts` require a
**dev server restart** — middleware/proxy files are not hot-reloaded.

## Cypress

- Config: `apps/next-app/cypress.config.ts` (`baseUrl: http://localhost:3000`)
- Specs: `apps/next-app/cypress/e2e/`
- Commands: `apps/next-app/cypress/support/commands.ts`

Run with `pnpm --filter @issue-tracker/next-app cypress:open`.

## Unit / integration tests

- Vitest config: `vitest.config.ts` (root) and per-package overrides
- Server components and server actions are covered by Cypress E2E, not unit tests
  — their RSC/`'use server'` boundaries are hard to simulate meaningfully in Vitest
