import type { Backend } from '@issue-tracker/backend/server';
import type { ProjectsFetchPort } from './getProjects/port.js';
import type { ProjectsFetchActivePort } from './getActiveProjects/port.js';
import type {
  AuthGetCurrentUserPort,
  ProjectsCreatePort,
} from './createProject/port.js';
import { createCreateProjectHandler } from './createProject/handler.js';
import { createGetActiveProjectsHandler } from './getActiveProjects/handler.js';
import { createGetProjectsHandler } from './getProjects/handler.js';

export function createProjectsHandlers(backend: Backend) {
  return {
    createProjectHandler: createCreateProjectHandler({
      ...backend.auth,
      ...backend.projects,
    } as AuthGetCurrentUserPort & ProjectsCreatePort),
    getProjectsHandler: createGetProjectsHandler(
      backend.projects as ProjectsFetchPort
    ),
    getActiveProjectsHandler: createGetActiveProjectsHandler(
      backend.projects as ProjectsFetchActivePort
    ),
  };
}
