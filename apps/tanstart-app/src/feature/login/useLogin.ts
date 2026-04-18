import { useMutation } from '@tanstack/react-query';
import { useRouter } from '@tanstack/react-router';
import { loginFn } from './rpc';
import type { LoginState } from '@issue-tracker/backend';

export const loginInitialState: LoginState = {
  success: false,
  errors: {},
  message: '',
};

export const useLogin = () => {
  const router = useRouter();

  const loginMutation = useMutation({
    mutationFn: loginFn,
    onSuccess: async ctx => {
      if (ctx.success) {
        await router.navigate({ to: '/' });
      }
    },
  });

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    loginMutation.mutate({
      data: {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
      },
    });
  };

  return {
    handleSubmit,
    isPending: loginMutation.isPending,
    data: loginMutation.data || loginInitialState,
    isError: loginMutation.isError,
  };
};
