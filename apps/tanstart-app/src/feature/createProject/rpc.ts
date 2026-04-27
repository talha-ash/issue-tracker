import { createServerSupabaseClient } from '#/lib/supabase/server';
import {
  projectsHandler,
  type CreateProjectInput,
} from '@issue-tracker/backend';
import { createServerFn } from '@tanstack/react-start';

export const createProjectFn = createServerFn({ method: 'POST' })
  .inputValidator((d: CreateProjectInput) => d)
  .handler(async ({ data }) => {
    const supabase = createServerSupabaseClient();
    return projectsHandler.createProject(supabase, data);
  });
