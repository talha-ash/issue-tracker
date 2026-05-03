import type { Backend } from '@issue-tracker/backend/server';
import { createAuthHandlers } from './feature/auth/index.js';
import { createProjectsHandlers } from './feature/projects/index.js';

export function createHandlers(backend: Backend) {
  return {
    authHandlers: createAuthHandlers(backend),
    projectsHandlers: createProjectsHandlers(backend),
  };
}

export type { Backend };

export type {
  LoginFieldErrors,
  LoginInput,
  LoginState,
  LoginValues,
} from './feature/auth/login/types.js';
export type {
  SignupFieldErrors,
  SignupInput,
  SignupState,
  SignupValues,
} from './feature/auth/signup/types.js';
export type {
  CreateProjectFieldErrors,
  CreateProjectInput,
  CreateProjectState,
  CreateProjectValues,
} from './feature/projects/createProject/types.js';
export type { Project } from './feature/projects/types.js';

export type {
  ActionState,
  Database,
  DbClient,
  Enums,
  Json,
  Session,
  Tables,
  TablesInsert,
  TablesUpdate,
  User,
} from '@issue-tracker/backend/shared';
