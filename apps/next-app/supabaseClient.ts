import { createSupabaseClient } from "@issue-tracker/backend/supabase";

export function getSupabaseClient() {
  return createSupabaseClient(
    process.env["SUPABASE_URL"]!,
    process.env["SUPABASE_ANON_KEY"]!
  );
}
