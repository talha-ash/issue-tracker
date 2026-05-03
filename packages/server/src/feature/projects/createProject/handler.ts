import type { AuthGetCurrentUserPort, ProjectsCreatePort } from './port.js';
import { validateCreateProject } from './service.js';
import type {
  CreateProjectInput,
  CreateProjectState,
  CreateProjectValues,
} from './types.js';

type CreateProjectBackend = AuthGetCurrentUserPort & ProjectsCreatePort;

export function createCreateProjectHandler(backend: CreateProjectBackend) {
  return async function createProjectHandler(
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

    const userResult = await backend.getCurrentUser();
    if (userResult.isErr()) {
      return {
        success: false,
        errors: {},
        message: 'Not authenticated',
        values: input,
      };
    }

    const result = await backend.createProject({
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
