import type { DbClient } from "../../shared/db.js"
import type { Project } from "../../shared/types.js"

export async function fetchProjects(client: DbClient) {
    const query = client.from("projects").select()

    const { data, error } = await query
    if (error) return { data: null, error }
    return { data, error } as { data: Project[]; error: null };
}
