import { createServerClient } from '@supabase/ssr'
import { getCookies, setCookie } from '@tanstack/react-start/server'
import type { Database } from '@issue-tracker/core'

export function createServerSupabaseClient() {
  return createServerClient<Database>(
    import.meta.env.VITE_SUPABASE_URL as string,
    import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string,
    {
      cookies: {
        getAll() {
          const all = getCookies()
          return Object.entries(all).map(([name, value]) => ({ name, value }))
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            setCookie(name, value, options)
          })
        },
      },
    },
  )
}
