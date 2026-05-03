import type { ProjectsFetchActivePort } from './port.js';

export function createGetActiveProjectsHandler(
  backend: ProjectsFetchActivePort
) {
  return function getActiveProjectsHandler() {
    return backend.fetchActiveProjects();
  };
}
