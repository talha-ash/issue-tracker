import * as auth from './context/auth.js';
import * as projects from './context/projects.js';

export const backendRepo = {
  auth: {
    signIn: auth.signIn,
    signUp: auth.signUp,
    signOut: auth.signOut,
  },
  projects: {
    fetchProjects: projects.fetchProjects,
  },
};
