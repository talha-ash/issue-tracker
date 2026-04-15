import { ok } from 'neverthrow'
import { backendRepo } from '@issue-tracker/repo/backend'
import type { DbClient } from '@issue-tracker/repo/shared'
import type { Project } from './types.js'

function filterActiveProjects(projects: Project[]) {
    return projects.filter((p) => p.visibility === 'public')
}

export async function getProjects(client: DbClient) {
    return backendRepo.projects.fetchProjects(client)
}

export async function getActiveProjects(client: DbClient) {
    const result = await backendRepo.projects.fetchProjects(client)
    if (result.isErr()) return result
    return ok(filterActiveProjects(result.value))
}
