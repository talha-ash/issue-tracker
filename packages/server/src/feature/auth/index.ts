import type { Backend } from '@issue-tracker/backend/server';
import { createLoginHandler } from './login/handler.js';
import { createSignupHandler } from './signup/handler.js';

export function createAuthHandlers(backend: Backend) {
  return {
    loginHandler: createLoginHandler(backend.auth),
    signupHandler: createSignupHandler(backend.auth),
  };
}
