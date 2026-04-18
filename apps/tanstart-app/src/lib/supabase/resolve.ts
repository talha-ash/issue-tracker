import { getBrowserSupabaseClient } from './client';
import { createServerSupabaseClient } from './server';

export function resolveSupabase() {
  if (typeof window === 'undefined') {
    return createServerSupabaseClient();
  }
  return getBrowserSupabaseClient();
}
