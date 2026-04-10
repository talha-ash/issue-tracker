import { ok } from 'neverthrow'
import type { DbClient } from '../../shared/client.js'
import { fetchProjects } from './adapter.js'
import type { Project } from './model.js'

function filterActiveProjects(projects: Project[]) {
  return projects.filter((p) => p.visibility === 'public')
}

export async function getProjects(client: DbClient) {
  return fetchProjects(client)
}

export async function getActiveProjects(client: DbClient) {
  const result = await fetchProjects(client)
  if (result.isErr()) return result
  return ok(filterActiveProjects(result.value))
}
