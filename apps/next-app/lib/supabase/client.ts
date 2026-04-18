import { createBrowserClient } from '@supabase/ssr';
import type { Database, DbClient } from '@issue-tracker/backend';

export function createClientSupabaseClient(): DbClient {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY as string
  ) as DbClient;
}

let _singleton: DbClient | null = null;

export function getBrowserSupabaseClient(): DbClient {
  if (!_singleton) _singleton = createClientSupabaseClient();
  return _singleton;
}
