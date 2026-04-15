import { Err, err, Ok, ok } from 'neverthrow'
import * as v from 'valibot'
import type { LoginFieldErrors, LoginInput } from './types.js'
import { LoginSchema } from './validations.js'


export function validateLoginFormData(input: LoginInput):
  (Ok<true, never> | Err<never, { errors: LoginFieldErrors, message: string }>) {

  const result = v.safeParse(LoginSchema, input)
  if (!result.success) {
    const flat = v.flatten<typeof LoginSchema>(result.issues)
    return err({
      errors: flat.nested as LoginFieldErrors,
      message: 'Please fix the errors',
    })

  }

  return ok(true)

  
}


export function login(client, {email, password}){

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