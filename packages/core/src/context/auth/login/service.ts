import type { Session, User } from '@supabase/supabase-js'
import * as v from 'valibot'
import type { DbClient } from '../../../shared/client.js'
import { signInWithPassword } from './adapter.js'
import type { LoginFieldErrors, LoginInput, LoginState } from './types.js'

const LoginSchema = v.object({
  email: v.pipe(
    v.string('Email is required'),
    v.trim(),
    v.email('Please enter a valid email'),
  ),
  password: v.pipe(
    v.string('Password is required'),
    v.minLength(1, 'Password is required'),
  ),
})

export async function loginService(
  client: DbClient,
  input: LoginInput,
): Promise<LoginState> {
  const result = v.safeParse(LoginSchema, input)
  if (!result.success) {
    const flat = v.flatten<typeof LoginSchema>(result.issues)
    return {
      success: false,
      errors: (flat.nested ?? {}) as LoginFieldErrors,
      message: 'Please fix the errors',
      values: { email: input.email },
    }
  }

  const { data, error } = await signInWithPassword(client, input.email, input.password)
  if (data.user) {
    return {
      success: true,
      errors: {},
      message: 'Login successful',
      data: data as { user: User; session: Session },
    }
  }
  return {
    success: false,
    errors: {},
    message: error ? error.message : 'Login failed',
    values: { email: input.email },
  }
}
