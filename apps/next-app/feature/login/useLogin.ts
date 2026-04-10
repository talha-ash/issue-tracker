import { useActionState, useEffect } from "react";
import { loginAction, LoginState } from "@/app/actions/auth";
import { useRouter } from 'next/navigation'


export const loginInitialState: LoginState = {
    success: false,
    errors: {},
    message: '',
};

export const useLogin = () => {
    const router = useRouter();

    const [state, formAction, isPending] = useActionState(
        loginAction,
        loginInitialState
    );


    useEffect(() => {
        if (state.success) {
            router.push('/');
        }
    }, [state.success, router]);

    return { state, formAction, isPending };
}