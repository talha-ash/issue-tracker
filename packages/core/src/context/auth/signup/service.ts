import { err, Err, ok, Ok } from 'neverthrow'
import * as v from 'valibot'
import type { SignupFieldErrors, SignupInput } from './types.js'
import { SignupSchema } from './validations.js'

export function validateSignupForm(
  input: SignupInput,
): (Ok<true, never> | Err<never, { errors: SignupFieldErrors, message: string }>) {
  const result = v.safeParse(SignupSchema, input)
  if (!result.success) {
    const flat = v.flatten<typeof SignupSchema>(result.issues)
    return err({
      errors: flat.nested as SignupFieldErrors,
      message: 'Please fix the errors',
    })

  }

  return ok(true)

  // const { data, error } = await signUp(client, input.email, input.password, input.fullname)
  // if (data.user) {
  //   return ok(
  //     data as { user: User; session: Session },
  //     'Signup successful! Please check your email to confirm your account.',
  //   )
  // }
  // return fail(
  //   {} as SignupFieldErrors,
  //   error ? error.message : 'Signup failed',
  //   { fullname: input.fullname, email: input.email },
  // )
}
