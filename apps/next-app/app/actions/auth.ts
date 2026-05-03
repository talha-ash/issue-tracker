'use server';

import { createBackendClient } from '@/lib/backend';
import { createHandlers } from '@issue-tracker/server';
import { redirect } from 'next/navigation';

export type {
  LoginFieldErrors,
  LoginState,
  LoginValues,
  SignupFieldErrors,
  SignupState,
  SignupValues,
} from '@issue-tracker/server';

export async function signupAction(
  _prev: Awaited<ReturnType<typeof createHandlers>>,
  formData: FormData
) {
  const backend = await createBackendClient();
  return createHandlers(backend).authHandlers.signupHandler({
    fullname: formData.get('fullname') as string,
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    confirmPassword: formData.get('confirmPassword') as string,
  });
}

export async function loginAction(
  _prev: Awaited<ReturnType<typeof createHandlers>>,
  formData: FormData
) {
  const backend = await createBackendClient();
  const resp = await createHandlers(backend).authHandlers.loginHandler({
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  });
  if (resp.success) {
    redirect('/');
  }
  return resp;
}
