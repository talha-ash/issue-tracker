import { err, ok } from 'neverthrow';
import * as v from 'valibot';
import type { LoginFieldErrors, LoginInput } from './types.js';
import { LoginSchema } from './validationSchemas.js';

export function validateLoginFormData(input: LoginInput) {
  const result = v.safeParse(LoginSchema, input);
  if (!result.success) {
    const flat = v.flatten<typeof LoginSchema>(result.issues);
    return err({
      errors: flat.nested as LoginFieldErrors,
      message: 'Please fix the errors',
    });
  }
  return ok(true as const);
}
