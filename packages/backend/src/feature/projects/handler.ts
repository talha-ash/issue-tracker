import type { DbClient } from '@issue-tracker/repo/shared'
import { getActiveProjects, getProjects } from './service.js'

export { getProjects, getActiveProjects }

export async function fetchProjects(client: DbClient) {
    return getProjects(client)
}
