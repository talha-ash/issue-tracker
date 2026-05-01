import type { Backend } from '@issue-tracker/backend/server';
import { createCreateProjectHandler } from './createProject/handler.js';
import { createGetActiveProjectsHandler } from './getActiveProjects/handler.js';
import { createGetProjectsHandler } from './getProjects/handler.js';

export function createProjectsHandlers(backend: Backend) {
  return {
    createProjectHandler: createCreateProjectHandler(backend),
    getProjectsHandler: createGetProjectsHandler(backend),
    getActiveProjectsHandler: createGetActiveProjectsHandler(backend),
  };
}
