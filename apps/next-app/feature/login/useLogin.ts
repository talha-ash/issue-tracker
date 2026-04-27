import { loginAction, LoginState } from '@/app/actions/auth';
import { useActionState } from 'react';

export const loginInitialState: LoginState = {
  success: false,
  errors: {},
  message: '',
};

export const useLogin = () => {
  const [state, formAction, isPending] = useActionState(
    loginAction,
    loginInitialState
  );

  return { state, formAction, isPending };
};
