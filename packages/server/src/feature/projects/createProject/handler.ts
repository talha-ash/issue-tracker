import type { Backend } from '@issue-tracker/backend/server';
import type { DbClient } from '@issue-tracker/backend/shared';
import { validateCreateProject } from './service.js';
import type {
  CreateProjectInput,
  CreateProjectState,
  CreateProjectValues,
} from './types.js';

export function createCreateProjectHandler(backend: Backend) {
  return async function createProjectHandler(
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

    const userResult = await backend.auth.getCurrentUser(client);
    if (userResult.isErr()) {
      return {
        success: false,
        errors: {},
        message: 'Not authenticated',
        values: input,
      };
    }

    const result = await backend.projects.createProject(client, {
      ...input,
      owner_id: userResult.value.id,
    });

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
  };
}
