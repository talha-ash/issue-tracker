import { createBackend } from '@issue-tracker/backend/server';
import { createServerSupabaseClient } from '#/lib/supabase/server';

export function createBackendClient() {
  return createBackend(createServerSupabaseClient());
}
