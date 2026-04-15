'use server'

import { createServerSupabaseClient } from '@/lib/supabase/server'
import { loginHandler, signupHandler } from '@issue-tracker/backend'

export type { LoginFieldErrors, LoginState, LoginValues, SignupFieldErrors, SignupState, SignupValues } from '@issue-tracker/backend'

export async function signupAction(
  _prev: Awaited<ReturnType<typeof signupHandler.signup>>,
  formData: FormData,
) {
  const supabase = await createServerSupabaseClient()
  return signupHandler.signup(supabase, {
    fullname: formData.get('fullname') as string,
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    confirmPassword: formData.get('confirmPassword') as string,
  })
}

export async function loginAction(
  _prev: Awaited<ReturnType<typeof loginHandler.login>>,
  formData: FormData,
) {
  const supabase = await createServerSupabaseClient()
  return loginHandler.login(supabase, {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  })
}
