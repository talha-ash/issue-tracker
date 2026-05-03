import { createBackendClient } from '#/lib/backend';
import { createHandlers, type LoginInput } from '@issue-tracker/server';
import { createServerFn } from '@tanstack/react-start';

export const loginFn = createServerFn({ method: 'POST' })
  .inputValidator((d: LoginInput & { redirectUrl?: string }) => d)
  .handler(async ({ data }) => {
    const backend = createBackendClient();
    return createHandlers(backend).authHandlers.loginHandler({
      email: data.email,
      password: data.password,
    });
  });
