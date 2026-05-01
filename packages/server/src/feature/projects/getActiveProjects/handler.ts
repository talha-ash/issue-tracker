import type { Backend } from '@issue-tracker/backend/server';
import type { DbClient } from '@issue-tracker/backend/shared';

export function createGetActiveProjectsHandler(backend: Backend) {
  return function getActiveProjectsHandler(client: DbClient) {
    return backend.projects.fetchActiveProjects(client);
  };
}
