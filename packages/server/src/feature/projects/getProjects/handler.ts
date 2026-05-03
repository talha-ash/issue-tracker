import type { ProjectsFetchPort } from './port.js';

export function createGetProjectsHandler(backend: ProjectsFetchPort) {
  return function getProjectsHandler() {
    return backend.fetchProjects();
  };
}
