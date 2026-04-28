import { backendRepo } from '@issue-tracker/repo/backend';
import type { DbClient } from '@issue-tracker/repo/shared';

export function createGetProjectsHandler(repo: typeof backendRepo) {
  return async function getProjects(client: DbClient) {
    return repo.projects.fetchProjects(client);
  };
}
