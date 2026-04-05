import { createApiClient } from "@issue-tracker/backend";

export function Api() {
  return createApiClient(
    process.env["SUPABASE_URL"]!,
    process.env["SUPABASE_ANON_KEY"]!
  );
}
