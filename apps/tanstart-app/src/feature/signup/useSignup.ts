import { useMutation } from '@tanstack/react-query';
import { useRouter } from '@tanstack/react-router';
import type { SignupState } from '@issue-tracker/backend';
import { signupFn } from './rpc';

export const signupInitialState: SignupState = {
  success: false,
  errors: {},
  message: '',
};

export const useSignup = () => {
  const router = useRouter();

  const signupMutation = useMutation({
    mutationFn: signupFn,
    onSuccess: async ctx => {
      if (ctx.success) {
        await router.navigate({ to: '/' });
      }
    },
  });

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    signupMutation.mutate({
      data: {
        fullname: formData.get('fullname') as string,
        email: formData.get('email') as string,
        password: formData.get('password') as string,
        confirmPassword: formData.get('confirmPassword') as string,
      },
    });
  };

  return {
    handleSubmit,
    isPending: signupMutation.isPending,
    data: signupMutation.data ?? signupInitialState,
    isError: signupMutation.isError,
  };
};
