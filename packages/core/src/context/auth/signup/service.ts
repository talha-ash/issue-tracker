import type { Session, User } from '@supabase/supabase-js'
import * as v from 'valibot'
import type { DbClient } from '../../../shared/client.js'
import { signUp } from './adapter.js'
import type { SignupFieldErrors, SignupInput, SignupState } from './types.js'

const SignupSchema = v.pipe(
  v.object({
    fullname: v.pipe(
      v.string('Full name is required'),
      v.trim(),
      v.minLength(2, 'Full name is too short'),
    ),
    email: v.pipe(
      v.string('Email is required'),
      v.trim(),
      v.email('Please enter a valid email'),
    ),
    password: v.pipe(
      v.string('Password is required'),
      v.minLength(8, 'Password must be at least 8 characters'),
    ),
    confirmPassword: v.string('Please confirm your password'),
  }),
  v.forward(
    v.partialCheck(
      [['password'], ['confirmPassword']],
      (input) => input.password === input.confirmPassword,
      'Passwords do not match',
    ),
    ['confirmPassword'],
  ),
)

export async function signupService(
  client: DbClient,
  input: SignupInput,
): Promise<SignupState> {
  const result = v.safeParse(SignupSchema, input)
  if (!result.success) {
    const flat = v.flatten<typeof SignupSchema>(result.issues)
    return {
      success: false,
      errors: (flat.nested ?? {}) as SignupFieldErrors,
      message: 'Please fix the errors',
      values: { fullname: input.fullname, email: input.email },
    }
  }

  const { data, error } = await signUp(client, input.email, input.password, input.fullname)
  if (data.user) {
    return {
      success: true,
      errors: {},
      message: 'Signup successful! Please check your email to confirm your account.',
      data: data as { user: User; session: Session },
    }
  }
  return {
    success: false,
    errors: {},
    message: error ? error.message : 'Signup failed',
    values: { fullname: input.fullname, email: input.email },
  }
}
