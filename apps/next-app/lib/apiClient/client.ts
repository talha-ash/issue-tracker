import { createApiClient } from "@issue-tracker/backend";

export function Api() {
  return createApiClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY as string,
  );
}
