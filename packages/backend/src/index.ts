import { createLoginHandler } from './feature/auth/login/handler.js';
import { createSignUpHandler } from './feature/auth/signup/handler.js';
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
  Database,
  DbClient,
  ActionState,
  Tables,
  TablesInsert,
  TablesUpdate,
  Enums,
  Json,
} from '@issue-tracker/repo/shared';

const loginHandler = createLoginHandler(backendRepo);
const signupHandler = createSignUpHandler(backendRepo);
const projectsHandler = createProjectsHandler(backendRepo);

export { loginHandler, signupHandler, projectsHandler };
