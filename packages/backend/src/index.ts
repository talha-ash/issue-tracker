import { createAuthHandler } from './feature/auth/handler.js';
import { createProjectsHandler } from './feature/projects/handler.js';
import { backendRepo } from '@issue-tracker/repo/backend';
export type {
  LoginState,
  LoginInput,
  LoginFieldErrors,
  LoginValues,
} from './feature/auth/login/types.js';
export type {
  SignupState,
  SignupInput,
  SignupFieldErrors,
  SignupValues,
} from './feature/auth/signup/types.js';
export type { Project } from './feature/projects/types.js';
export type {
  CreateProjectInput,
  CreateProjectState,
  CreateProjectFieldErrors,
  CreateProjectValues,
} from './feature/projects/createProject/types.js';
export type {
  Database,
  DbClient,
  ActionState,
  Tables,
  TablesInsert,
  TablesUpdate,
  Enums,
  Json,
} from '@issue-tracker/repo/shared';

const authHandler = createAuthHandler(backendRepo);
const projectsHandler = createProjectsHandler(backendRepo);

export { authHandler, projectsHandler };
