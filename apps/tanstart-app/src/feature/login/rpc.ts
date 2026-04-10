import { createServerSupabaseClient } from "#/lib/supabase/server";
import { loginService } from "@issue-tracker/core/context/auth";
import { createServerFn } from "@tanstack/react-start";

export const loginFn = createServerFn({ method: 'POST' })
    .inputValidator(
        (d: { email: string; password: string; redirectUrl?: string }) => d,
    )
    .handler(async ({ data }) => {
        const supabase = createServerSupabaseClient()

        return loginService(supabase, {
            email: data.email,
            password: data.password
        })
    })

