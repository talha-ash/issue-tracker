import type {
  CreateProjectInput,
  CreateProjectState,
} from '@issue-tracker/backend';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from '@tanstack/react-router';
import { createProjectFn } from './rpc';

export const createProjectInitialState: CreateProjectState = {
  success: false,
  errors: {},
  message: '',
};

export const useCreateProject = () => {
  const router = useRouter();
  const createProjectMutation = useMutation({
    mutationFn: createProjectFn,
    onSuccess: async ctx => {
      if (ctx.success) {
        await router.navigate({ to: '/' });
      }
    },
  });

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name') as string;

    const projectKey = name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 4);

    createProjectMutation.mutate({
      data: {
        name,
        description: formData.get('description') as string,
        key: `PROJ${Date.now()}${projectKey}`,
        visibility: formData.get(
          'visibility'
        ) as CreateProjectInput['visibility'],
      },
    });
  };
  return {
    handleSubmit,
    isPending: createProjectMutation.isPending,
    data: createProjectMutation.data || createProjectInitialState,
    isError: createProjectMutation.isError,
  };
};
