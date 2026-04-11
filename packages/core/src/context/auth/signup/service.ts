import type { Session, User } from '@supabase/supabase-js'
import * as v from 'valibot'
import type { DbClient } from '../../../shared/client.js'
import { ok, fail } from '../../../shared/result.js'
import { signUp } from './adapter.js'
import type { SignupFieldErrors, SignupInput, SignupState } from './types.js'
import { SignupSchema } from './validations.js'

export async function signupService(
  client: DbClient,
  input: SignupInput,
): Promise<SignupState> {
  const result = v.safeParse(SignupSchema, input)
  if (!result.success) {
    const flat = v.flatten<typeof SignupSchema>(result.issues)
    return fail(
      (flat.nested ?? {}) as SignupFieldErrors,
      'Please fix the errors',
      { fullname: input.fullname, email: input.email },
    )
  }

  const { data, error } = await signUp(client, input.email, input.password, input.fullname)
  if (data.user) {
    return ok(
      data as { user: User; session: Session },
      'Signup successful! Please check your email to confirm your account.',
    )
  }
  return fail(
    {} as SignupFieldErrors,
    error ? error.message : 'Signup failed',
    { fullname: input.fullname, email: input.email },
  )
}
