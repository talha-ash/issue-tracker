import { createBrowserClient } from '@supabase/ssr'
import type { Database } from '@issue-tracker/core'

export function createClientSupabaseClient() {
  return createBrowserClient<Database>(
    import.meta.env.VITE_SUPABASE_URL as string,
    import.meta.env.VITE_SUPABASE_ANON_KEY as string,
  )
}

let _singleton: ReturnType<typeof createClientSupabaseClient> | null = null

export function getBrowserSupabaseClient() {
  if (!_singleton) _singleton = createClientSupabaseClient()
  return _singleton
}
