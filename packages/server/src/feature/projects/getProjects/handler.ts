import type { Backend } from '@issue-tracker/backend/server';
import type { DbClient } from '@issue-tracker/backend/shared';

export function createGetProjectsHandler(backend: Backend) {
  return function getProjectsHandler(client: DbClient) {
    return backend.projects.fetchProjects(client);
  };
}
