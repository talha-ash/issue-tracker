import { createBackendClient } from '#/lib/backend';
import { createHandlers, type CreateProjectInput } from '@issue-tracker/server';
import { createServerFn } from '@tanstack/react-start';

export const createProjectFn = createServerFn({ method: 'POST' })
  .inputValidator((d: CreateProjectInput) => d)
  .handler(async ({ data }) => {
    const backend = createBackendClient();
    return createHandlers(backend).projectsHandlers.createProjectHandler(data);
  });
