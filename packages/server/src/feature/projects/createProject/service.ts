import { err, ok } from 'neverthrow';
import * as v from 'valibot';
import type { CreateProjectFieldErrors, CreateProjectInput } from './types.js';
import { CreateProjectSchema } from './validationSchemas.js';

export function validateCreateProject(input: CreateProjectInput) {
  const result = v.safeParse(CreateProjectSchema, input);
  if (!result.success) {
    const flat = v.flatten<typeof CreateProjectSchema>(result.issues);
    return err({
      errors: flat.nested as CreateProjectFieldErrors,
      message: 'Please fix the errors',
    });
  }
  return ok(true as const);
}
