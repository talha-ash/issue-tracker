import type { Backend } from '@issue-tracker/backend/server';
import type { DbClient } from '@issue-tracker/backend/shared';
import { validateLoginFormData } from './service.js';
import type { LoginInput, LoginState, LoginValues } from './types.js';

export function createLoginHandler(backend: Backend) {
  return async function loginHandler(
    client: DbClient,
    input: LoginInput
  ): Promise<LoginState> {
    const validation = validateLoginFormData(input);
    if (validation.isErr()) {
      return {
        success: false,
        errors: validation.error.errors,
        message: validation.error.message,
        values: { email: input.email } satisfies LoginValues,
      };
    }

    const result = await backend.auth.signIn(
      client,
      input.email,
      input.password
    );
    if (result.isOk()) {
      return {
        success: true,
        message: 'Login successful',
        data: result.value,
      };
    }
    return {
      success: false,
      errors: {},
      message: result.error.message,
      values: { email: input.email },
    };
  };
}
