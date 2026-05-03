import { createBackendClient } from '#/lib/backend';
import { createHandlers } from '@issue-tracker/server';
import { createServerFn } from '@tanstack/react-start';

export const signupFn = createServerFn({ method: 'POST' })
  .inputValidator(
    (d: {
      fullname: string;
      email: string;
      password: string;
      confirmPassword: string;
    }) => d
  )
  .handler(async ({ data }) => {
    const backend = createBackendClient();
    return createHandlers(backend).authHandlers.signupHandler(data);
  });
