import { backendRepo } from '@issue-tracker/repo/backend';
import { createLoginHandler } from './login/handler';
import { createSignupHandler } from './signup/handler';

function createAuthHandlers(repo: typeof backendRepo) {
  return {
    loginHandler: createLoginHandler(repo),
    signupHandler: createSignupHandler(repo),
  };
}

export { createAuthHandlers };
