'use server';

import { createServerSupabaseClient } from '@/lib/supabase/server';
import { authHandlers } from '@issue-tracker/backend';
import { redirect } from 'next/navigation';

export type {
  LoginFieldErrors,
  LoginState,
  LoginValues,
  SignupFieldErrors,
  SignupState,
  SignupValues,
} from '@issue-tracker/backend';

export async function signupAction(
  _prev: Awaited<ReturnType<typeof authHandlers.signupHandler>>,
  formData: FormData
) {
  const supabase = await createServerSupabaseClient();
  return authHandlers.signupHandler(supabase, {
    fullname: formData.get('fullname') as string,
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    confirmPassword: formData.get('confirmPassword') as string,
  });
}

export async function loginAction(
  _prev: Awaited<ReturnType<typeof authHandlers.loginHandler>>,
  formData: FormData
) {
  const supabase = await createServerSupabaseClient();
  const resp = await authHandlers.loginHandler(supabase, {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  });
  if (resp.success) {
    redirect('/');
  }
  return resp;
}
