import { loginHandler } from '@issue-tracker/backend'
import { createServerSupabaseClient } from '#/lib/supabase/server'
import { createServerFn } from '@tanstack/react-start'

export const loginFn = createServerFn({ method: 'POST' })
    .inputValidator(
        (d: { email: string; password: string; redirectUrl?: string }) => d,
    )
    .handler(async ({ data }) => {
        const supabase = createServerSupabaseClient()
        return loginHandler.login(supabase, {
            email: data.email,
            password: data.password,
        })
    })
