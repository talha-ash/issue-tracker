import { backendRepo } from '@issue-tracker/repo/backend'
import type { DbClient } from '@issue-tracker/repo/shared'
import { validateLoginFormData } from './service.js'
import type { LoginInput, LoginState, LoginValues } from './types.js'

export async function login(client: DbClient, input: LoginInput): Promise<LoginState> {
    const validation = validateLoginFormData(input)
    if (validation.isErr()) {
        return {
            success: false,
            errors: validation.error.errors,
            message: validation.error.message,
            values: { email: input.email } satisfies LoginValues,
        }
    }

    const { data, error } = await backendRepo.auth.signIn(client, input.email, input.password)
    if (data.user) {
        return {
            success: true,
            errors: {},
            message: 'Login successful',
            data: { user: data.user, session: data.session },
        }
    }
    return {
        success: false,
        errors: {},
        message: error?.message ?? 'Login failed',
        values: { email: input.email },
    }
}
