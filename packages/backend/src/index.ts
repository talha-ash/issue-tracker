import { createAuthCtx } from './context/auth.js';
import { createProjectsCtx } from './context/projects.js';
import { DbClient } from './shared/client.js';

export function createBackend(client: DbClient) {
  return {
    auth: createAuthCtx(client),
    projects: createProjectsCtx(client),
  };
}

export type Backend = ReturnType<typeof createBackend>;

export type {
  ActionState,
  Constants,
  Database,
  DbClient,
  Enums,
  Json,
  Session,
  Tables,
  TablesInsert,
  TablesUpdate,
  User,
} from './shared/index.js';
