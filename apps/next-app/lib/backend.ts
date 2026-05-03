import { createBackend } from '@issue-tracker/backend/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';

export async function createBackendClient() {
  return createBackend(await createServerSupabaseClient());
}
