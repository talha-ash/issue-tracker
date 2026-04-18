import { signupHandler } from '@issue-tracker/backend';
import { createServerSupabaseClient } from '#/lib/supabase/server';
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
    const supabase = createServerSupabaseClient();
    return signupHandler.signup(supabase, data);
  });
