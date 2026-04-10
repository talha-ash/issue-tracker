import { createServerSupabaseClient } from '#/lib/supabase/server'
import { signupService } from '@issue-tracker/core/context/auth'
import { createServerFn } from '@tanstack/react-start'

export const signupFn = createServerFn({ method: 'POST' })
    .inputValidator(
        (d: { fullname: string; email: string; password: string; confirmPassword: string }) => d,
    )
    .handler(async ({ data }) => {
        const supabase = createServerSupabaseClient()
        return signupService(supabase, data)
    })
