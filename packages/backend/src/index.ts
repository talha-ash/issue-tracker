import { backendRepo } from '@issue-tracker/repo/backend';
import { createAuthHandlers } from './feature/auth/index.js';
import { createProjectsHandlers } from './feature/projects/index.js';

export type {
  ActionState,
  Database,
  DbClient,
  Enums,
  Json,
  Tables,
  TablesInsert,
  TablesUpdate,
} from '@issue-tracker/repo/shared';
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

export const authHandlers = createAuthHandlers(backendRepo);
export const projectsHandlers = createProjectsHandlers(backendRepo);
