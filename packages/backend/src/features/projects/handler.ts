import type { DbClient } from "../../shared/db.js"
import { fetchProjects } from "./db.js"
import { filterActiveProjects } from "./logic.js"

async function getProjects(client: DbClient) {
    const { data, error } = await fetchProjects(client)
    if (error) throw error
    return data
}

async function getActiveProjects(client: DbClient) {
    const { data, error } = await fetchProjects(client)
    if (error) throw error
    return filterActiveProjects(data)
}


export function projectHandler(client: DbClient) {
    return {
        getProjects: () => getProjects(client),
        getActiveProjects: () => getActiveProjects(client),
    }
}