import { createBrowserClient } from '@supabase/ssr'
import type { Database } from '@issue-tracker/core'

export function createClientSupabaseClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY as string,
  )
}

let _singleton: ReturnType<typeof createClientSupabaseClient> | null = null

export function getBrowserSupabaseClient() {
  if (!_singleton) _singleton = createClientSupabaseClient()
  return _singleton
}
