'use server'

import { loginService, signupService } from '@issue-tracker/core/context/auth'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import {loginHandler} from "@issue-tracker/backend"
export type { LoginFieldErrors, LoginState, LoginValues } from '@issue-tracker/core/context/auth'
export type { SignupFieldErrors, SignupState, SignupValues } from '@issue-tracker/core/context/auth'

export async function signupAction(
  _prev: Awaited<ReturnType<typeof signupService>>,
  formData: FormData,
) {
  const supabase = await createServerSupabaseClient()
  return signupService(supabase, {
    fullname: formData.get('fullname') as string,
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    confirmPassword: formData.get('confirmPassword') as string,
  })
}

export async function loginAction(
  _prev: Awaited<ReturnType<typeof loginService>>,
  formData: FormData,
) {
  const supabase = await createServerSupabaseClient()
  return loginService(supabase, {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  })
}
