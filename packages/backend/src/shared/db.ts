import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { Database } from './database.types.js';

export type DbClient = SupabaseClient<Database>;

export function createDbClient(url: string, anonKey: string): DbClient {
  return createClient<Database>(url, anonKey);
}
