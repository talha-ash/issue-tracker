import { ok } from "neverthrow"
import type { DbClient } from "../../shared/db.js"
import { fetchProjects } from "./db.js"
import { filterActiveProjects } from "./logic.js"

async function getProjects(client: DbClient) {
    const result = await fetchProjects(client)
    return result
}

async function getActiveProjects(client: DbClient) {
    const result = await fetchProjects(client)
    if (result.isErr()) {
        return result
    }
    return ok(filterActiveProjects(result.value))
}


export function projectHandler(client: DbClient) {
    return {
        getProjects: () => getProjects(client),
        getActiveProjects: () => getActiveProjects(client),
    }
}