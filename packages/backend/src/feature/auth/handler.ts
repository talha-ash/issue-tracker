import { backendRepo } from '@issue-tracker/repo/backend';
import type { DbClient } from '@issue-tracker/repo/shared';
import { validateLoginFormData } from './login/service.js';
import type { LoginInput, LoginState, LoginValues } from './login/types.js';
import { validateSignupForm } from './signup/service.js';
import type { SignupInput, SignupState, SignupValues } from './signup/types.js';

export function createAuthHandler(repo: typeof backendRepo) {
  return {
    async login(client: DbClient, input: LoginInput): Promise<LoginState> {
      const validation = validateLoginFormData(input);
      if (validation.isErr()) {
        return {
          success: false,
          errors: validation.error.errors,
          message: validation.error.message,
          values: { email: input.email } satisfies LoginValues,
        };
      }

      const { data, error } = await repo.auth.signIn(
        client,
        input.email,
        input.password
      );
      if (data.user) {
        return {
          success: true,
          message: 'Login successful',
          data: { user: data.user, session: data.session },
        };
      }
      return {
        success: false,
        errors: {},
        message: error?.message ?? 'Login failed',
        values: { email: input.email },
      };
    },

    async signup(client: DbClient, input: SignupInput): Promise<SignupState> {
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

      const { data, error } = await repo.auth.signUp(
        client,
        input.email,
        input.password,
        input.fullname
      );
      if (data.user && data.session) {
        return {
          success: true,
          message:
            'Signup successful! Please check your email to confirm your account.',
          data: { user: data.user, session: data.session },
        };
      }
      return {
        success: false,
        errors: {},
        message: error?.message ?? 'Signup failed',
        values: { fullname: input.fullname, email: input.email },
      };
    },
  };
}
