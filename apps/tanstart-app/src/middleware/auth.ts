import { createMiddleware } from '@tanstack/react-start'
import { setResponseHeader, setResponseStatus } from '@tanstack/react-start/server'
import { createServerSupabaseClient } from '#/lib/supabase/server'
import { redirect } from '@tanstack/react-router'

const PUBLIC_PATHS = ['/_auth/login', '/_auth/signup', '/login', '/signup']

function isPublicPath(pathname: string) {
  return PUBLIC_PATHS.some((p) => pathname.startsWith(p))
}

/**
 * Request middleware — runs on every server request (SSR, server routes, server functions).
 * Validates the session and redirects unauthenticated GET requests to /login.
 * Attaches the user to context for downstream middleware and server functions.
 */
export const authRequestMiddleware = createMiddleware().server(
  async ({ request, next }) => {    
    // Only guard page/SSR requests — server function RPCs are POST requests
    // and are protected by authFunctionMiddleware instead.
    if (request.method !== 'GET' || isPublicPath(new URL(request.url).pathname)) {
      return next()
    }

    const supabase = createServerSupabaseClient()
    const { data } = await supabase.auth.getUser()

    if (!data.user) {
      setResponseStatus(302)
      setResponseHeader('Location', '/login')
      console.log("I do Redirect")
      return redirect({ to: "/login" })
    }

    return next({
      context: { user: data.user },
    })
  },
)

/**
 * Server function middleware — runs for every server function.
 * Attaches the user (or null) to context so server functions can access
 * context.user without each one calling getUser individually.
 */
export const authFunctionMiddleware = createMiddleware({ type: 'function' }).server(
  async ({ next }) => {
    const supabase = createServerSupabaseClient()
    const { data } = await supabase.auth.getUser()

    return next({
      context: { user: data.user ?? null },
    })
  },
)
