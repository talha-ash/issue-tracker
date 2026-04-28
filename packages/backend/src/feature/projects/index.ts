import { backendRepo } from '@issue-tracker/repo/backend';
import { createCreateProjectHandler } from './createProject/handler';
import { createGetActiveProjectsHandler } from './getActiveProjects/handler';
import { createGetProjectsHandler } from './getProjects/handler';

export function createProjectsHandlers(repo: typeof backendRepo) {
  return {
    createProjectHandler: createCreateProjectHandler(repo),
    getProjectHandler: createGetProjectsHandler(repo),
    getActiveProjectHandler: createGetActiveProjectsHandler(repo),
  };
}
