import { useActionState } from 'react';
import {
  createProjectAction,
  type CreateProjectState,
} from '@/app/actions/projects';

export const createProjectInitialState: CreateProjectState = {
  success: false,
  errors: {},
  message: '',
};

export const useCreateProject = () => {
  const [state, formAction, isPending] = useActionState(
    createProjectAction,
    createProjectInitialState
  );

  return { state, formAction, isPending };
};
