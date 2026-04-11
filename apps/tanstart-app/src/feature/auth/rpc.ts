import { createServerFn } from '@tanstack/react-start'

export const fetchUser = createServerFn({ method: 'GET' }).handler(({ context }) => {
    // context.user is injected by authFunctionMiddleware — no extra getUser call needed
    const user = context.user as { email: string } | null

    if (!user?.email) return null

    return { email: user.email }
})
