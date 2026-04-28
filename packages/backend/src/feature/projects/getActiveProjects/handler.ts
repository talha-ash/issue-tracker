import { backendRepo } from '@issue-tracker/repo/backend';
import type { DbClient } from '@issue-tracker/repo/shared';
import { ok } from 'neverthrow';
import { filterActiveProjects } from './service.js';

export function createGetActiveProjectsHandler(repo: typeof backendRepo) {
  return async function getActiveProjects(client: DbClient) {
    const result = await repo.projects.fetchProjects(client);
    if (result.isErr()) return result;
    return ok(filterActiveProjects(result.value));
  };
}
