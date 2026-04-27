import { createServerSupabaseClient } from '#/lib/supabase/server';
import { authHandler, type LoginInput } from '@issue-tracker/backend';
import { createServerFn } from '@tanstack/react-start';

export const loginFn = createServerFn({ method: 'POST' })
  .inputValidator((d: LoginInput & { redirectUrl?: string }) => d)
  .handler(async ({ data }) => {
    const supabase = createServerSupabaseClient();
    return authHandler.login(supabase, {
      email: data.email,
      password: data.password,
    });
  });
