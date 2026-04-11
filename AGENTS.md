# Issue Tracker — Agent Instructions

See CLAUDE.md for full project context, conventions, and design system.

<!-- intent-skills:start -->
# Skill mappings - when working in these areas, load the linked skill file into context.
skills:
  - task: "TanStack Start app setup, React bindings, createStart, StartClient, StartServer, useServerFn"
    load: "apps/tanstart-app/skills/react-start.md"

  - task: "TanStack Start core — Vite plugin, router factory, root route document shell, getRouter"
    load: "apps/tanstart-app/skills/start-core.md"

  - task: "Server functions — createServerFn, input validation, Zod validator, error/redirect/notFound handling"
    load: "apps/tanstart-app/skills/start-core/server-functions.md"

  - task: "Middleware — createMiddleware, request middleware, server function middleware, context passing, sendContext"
    load: "apps/tanstart-app/skills/start-core/middleware.md"

  - task: "Execution model — isomorphic code, createServerOnlyFn, createClientOnlyFn, environment variables, VITE_ prefix"
    load: "apps/tanstart-app/skills/start-core/execution-model.md"

  - task: "Server routes — REST API endpoints, server.handlers, GET/POST/PUT/DELETE, createHandlers"
    load: "apps/tanstart-app/skills/start-core/server-routes.md"

  - task: "Deployment — Cloudflare Workers, Netlify, Vercel, Node.js, selective SSR, static prerendering, SEO head"
    load: "apps/tanstart-app/skills/start-core/deployment.md"

  - task: "Server-side runtime — cookies, sessions, useSession, getCookie, setCookie, request/response utilities"
    load: "apps/tanstart-app/skills/start-server-core.md"

  - task: "TanStack Router Vite plugin config, autoCodeSplitting, routesDirectory, tanstackRouter"
    load: "apps/tanstart-app/skills/router-plugin.md"

  - task: "Router core — route trees, createRouter, createRootRoute, Register, file naming conventions"
    load: "apps/tanstart-app/skills/router-core/router-core.md"

  - task: "Route protection, auth guards, beforeLoad redirects, _authed layout routes, RBAC, isRedirect"
    load: "apps/tanstart-app/skills/router-core/auth-and-guards.md"

  - task: "Route data loading, loaders, loaderDeps, staleTime, pendingComponent, router.invalidate, deferred data"
    load: "apps/tanstart-app/skills/router-core/data-loading.md"

  - task: "Navigation — Link, useNavigate, Navigate, preloading, navigation blocking, createLink, scroll restoration"
    load: "apps/tanstart-app/skills/router-core/navigation.md"

  - task: "Search params — validateSearch, Zod adapter, fallback, retainSearchParams, stripSearchParams, loaderDeps"
    load: "apps/tanstart-app/skills/router-core/search-params.md"

  - task: "Path params — dynamic segments $param, splat routes, optional params, prefix/suffix patterns, useParams"
    load: "apps/tanstart-app/skills/router-core/path-params.md"

  - task: "Code splitting — autoCodeSplitting, createLazyFileRoute, .lazy.tsx, getRouteApi, codeSplitGroupings"
    load: "apps/tanstart-app/skills/router-core/code-splitting.md"

  - task: "Not found and errors — notFound(), notFoundComponent, errorComponent, CatchBoundary, route masking"
    load: "apps/tanstart-app/skills/router-core/not-found-and-errors.md"

  - task: "SSR — streaming, non-streaming, RouterClient/RouterServer, HeadContent, Scripts, head management"
    load: "apps/tanstart-app/skills/router-core/ssr.md"

  - task: "TypeScript type safety — Register, from narrowing, strict false, getRouteApi, LinkProps, ValidateLinkOptions"
    load: "apps/tanstart-app/skills/router-core/type-safety.md"
<!-- intent-skills:end -->
