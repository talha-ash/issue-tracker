import { backendRepo } from '@issue-tracker/repo/backend'
import type { DbClient } from '@issue-tracker/repo/shared'
import { validateSignupForm } from './service.js'
import type { SignupFieldErrors, SignupInput, SignupState, SignupValues } from './types.js'

export async function signup(client: DbClient, input: SignupInput): Promise<SignupState> {
    const validation = validateSignupForm(input)
    if (validation.isErr()) {
        return {
            success: false,
            errors: validation.error.errors,
            message: validation.error.message,
            values: { fullname: input.fullname, email: input.email } satisfies SignupValues,
        }
    }

    const { data, error } = await backendRepo.auth.signUp(
        client,
        input.email,
        input.password,
        input.fullname,
    )
    if (data.user && data.session) {
        return {
            success: true,            
            message: 'Signup successful! Please check your email to confirm your account.',
            data: { user: data.user, session: data.session },
        }
    }
    return {
        success: false,
        errors: {} as SignupFieldErrors,
        message: error?.message ?? 'Signup failed',
        values: { fullname: input.fullname, email: input.email },
    }
}
