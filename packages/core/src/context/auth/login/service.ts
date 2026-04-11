import * as v from 'valibot'
import type { DbClient } from '../../../shared/client.js'
import { fail, ok } from '../../../shared/result.js'
import { signInWithPassword } from './adapter.js'
import type { LoginFieldErrors, LoginInput, LoginState } from './types.js'
import { LoginSchema } from './validations.js'

export async function loginService(
  client: DbClient,
  input: LoginInput,
): Promise<LoginState> {
  const result = v.safeParse(LoginSchema, input)
  if (!result.success) {
    const flat = v.flatten<typeof LoginSchema>(result.issues)
    return fail(
      flat.nested as LoginFieldErrors,
      'Please fix the errors',
      { email: input.email },
    )
  }

  const { data, error } = await signInWithPassword(client, input.email, input.password)
  if (data.user) {
    return ok(
      data,
      'Login successful',
    )
  }
  return fail(
    {},
    error ? error.message : 'Login failed',
    { email: input.email },
  )
}
