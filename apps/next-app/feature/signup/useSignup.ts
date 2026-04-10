import { useActionState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { signupAction } from '@/app/actions/auth'
import { signupInitialState } from './components/signup-form'

export const useSignup = () => {
    const router = useRouter()

    const [state, formAction, isPending] = useActionState(
        signupAction,
        signupInitialState
    )

    useEffect(() => {
        if (state.success) {
            router.push('/')
        }
    }, [state.success, router])

    return { state, formAction, isPending }
}
