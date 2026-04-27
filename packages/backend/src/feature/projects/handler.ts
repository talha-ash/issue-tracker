import { backendRepo } from '@issue-tracker/repo/backend';
import type { DbClient } from '@issue-tracker/repo/shared';
import { ok } from 'neverthrow';
import { validateCreateProject } from './createProject/service.js';
import type {
  CreateProjectInput,
  CreateProjectState,
  CreateProjectValues,
} from './createProject/types';
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

    async createProject(
      client: DbClient,
      input: CreateProjectInput
    ): Promise<CreateProjectState> {
      const validation = validateCreateProject(input);
      if (validation.isErr()) {
        return {
          success: false,
          errors: validation.error.errors,
          message: validation.error.message,
          values: input satisfies CreateProjectValues,
        };
      }

      const { data: user, error: authError } = await client.auth.getUser();
      if (authError) {
        return {
          success: false,
          errors: {},
          message: 'Not authenticated',
          values: input,
        };
      }

      const payload = { ...input, owner_id: user.user.id };
      console.log('Payload', payload);
      const result = await repo.projects.createProject(client, payload);

      if (result.isErr()) {
        return {
          success: false,
          errors: {},
          message: result.error.error.message,
          values: input,
        };
      }

      return {
        success: true,
        message: 'Project created successfully',
        data: result.value,
      };
    },
  };
}
