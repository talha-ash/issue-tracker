import { backendRepo } from '@issue-tracker/repo/backend';
import type { DbClient } from '@issue-tracker/repo/shared';
import { validateCreateProject } from './service.js';
import type {
  CreateProjectInput,
  CreateProjectState,
  CreateProjectValues,
} from './types.js';

export function createCreateProjectHandler(repo: typeof backendRepo) {
  return async function createProject(
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
  };
}
