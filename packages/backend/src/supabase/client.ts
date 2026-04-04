import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { Database } from "./database.types.js";

export function createSupabaseClient(url: string, anonKey: string): db {
  const client = createClient<Database>(url, anonKey);
  return {
    fetchProjects: () => fetchProjects(client)
  };
}

interface db {
  fetchProjects: () => Promise<any>;
}



async function  fetchProjects(client:SupabaseClient<Database>){
  return await client.from("projects").select();
}