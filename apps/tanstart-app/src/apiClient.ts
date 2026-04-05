import { createApiClient } from "@issue-tracker/backend";

export function Api() {
  return createApiClient(
    process.env.SUPABASE_URL as string,
    process.env.SUPABASE_ANON_KEY as string
  );
}
