import { err, ok } from 'neverthrow';
import * as v from 'valibot';
import type { SignupFieldErrors, SignupInput } from './types.js';
import { SignupSchema } from './validationSchemas.js';

export function validateSignupForm(input: SignupInput) {
  const result = v.safeParse(SignupSchema, input);
  if (!result.success) {
    const flat = v.flatten<typeof SignupSchema>(result.issues);
    return err({
      errors: flat.nested as SignupFieldErrors,
      message: 'Please fix the errors',
    });
  }
  return ok(true as const);
}
