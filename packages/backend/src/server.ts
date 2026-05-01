import * as auth from './context/auth.js';
import * as projects from './context/projects.js';

export const backend = {
  auth: {
    signIn: auth.signIn,
    signUp: auth.signUp,
    signOut: auth.signOut,
    getCurrentUser: auth.getCurrentUser,
  },
  projects: {
    fetchProjects: projects.fetchProjects,
    fetchActiveProjects: projects.fetchActiveProjects,
    createProject: projects.createProject,
  },
};

export type Backend = typeof backend;

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
