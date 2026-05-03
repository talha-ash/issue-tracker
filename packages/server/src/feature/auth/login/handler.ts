import type { AuthSignInPort } from './port.js';
import { validateLoginFormData } from './service.js';
import type { LoginInput, LoginState, LoginValues } from './types.js';

export function createLoginHandler(backend: AuthSignInPort) {
  return async function loginHandler(input: LoginInput): Promise<LoginState> {
    const validation = validateLoginFormData(input);
    if (validation.isErr()) {
      return {
        success: false,
        errors: validation.error.errors,
        message: validation.error.message,
        values: { email: input.email } satisfies LoginValues,
      };
    }

    const result = await backend.signIn(input.email, input.password);
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
