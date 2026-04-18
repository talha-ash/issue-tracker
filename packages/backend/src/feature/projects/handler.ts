import { ok } from 'neverthrow';
import { backendRepo } from '@issue-tracker/repo/backend';
import type { DbClient } from '@issue-tracker/repo/shared';
import { filterActiveProjects } from './service.js';

export function createProjectsHandler(repo: typeof backendRepo) {
  return {
    async getProjects(client: DbClient) {
      return repo.projects.fetchProjects(client);
    },

    async getActiveProjects(client: DbClient) {
      const result = await repo.projects.fetchProjects(client);
      if (result.isErr()) return result;
      return ok(filterActiveProjects(result.value));
    },
  };
}
