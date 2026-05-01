import * as auth from './context/auth.js';

export const backend = {
  auth: {
    signOut: auth.signOut,
  },
};

export type { DbClient, User, Session } from './shared/index.js';
export type {
  ActionState,
  Database,
  Tables,
  TablesInsert,
  TablesUpdate,
  Enums,
  Json,
  Constants,
} from './shared/index.js';
