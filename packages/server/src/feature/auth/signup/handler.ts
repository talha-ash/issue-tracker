import type { AuthSignUpPort } from './port.js';
import { validateSignupForm } from './service.js';
import type { SignupInput, SignupState, SignupValues } from './types.js';

export function createSignupHandler(backend: AuthSignUpPort) {
  return async function signupHandler(
    input: SignupInput
  ): Promise<SignupState> {
    const validation = validateSignupForm(input);
    if (validation.isErr()) {
      return {
        success: false,
        errors: validation.error.errors,
        message: validation.error.message,
        values: {
          fullname: input.fullname,
          email: input.email,
        } satisfies SignupValues,
      };
    }

    const result = await backend.signUp(
      input.email,
      input.password,
      input.fullname
    );
    if (result.isOk()) {
      return {
        success: true,
        message:
          'Signup successful! Please check your email to confirm your account.',
        data: result.value,
      };
    }
    return {
      success: false,
      errors: {},
      message: result.error.message,
      values: { fullname: input.fullname, email: input.email },
    };
  };
}
