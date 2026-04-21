import { createBrowserClient } from '@supabase/ssr';
import type { Database, DbClient } from '@issue-tracker/backend';

export function createClientSupabaseClient(): DbClient {
  return createBrowserClient<Database>(
    import.meta.env.VITE_SUPABASE_URL as string,
    import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string
  );
}

let _singleton: DbClient | null = null;

export function getBrowserSupabaseClient(): DbClient {
  if (!_singleton) _singleton = createClientSupabaseClient();
  return _singleton;
}
