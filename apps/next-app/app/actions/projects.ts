'use server';

import { createServerSupabaseClient } from '@/lib/supabase/server';
import { projectsHandler } from '@issue-tracker/backend';

export type {
  CreateProjectFieldErrors,
  CreateProjectState,
  CreateProjectValues,
} from '@issue-tracker/backend';

export async function createProjectAction(
  _prev: Awaited<ReturnType<typeof projectsHandler.createProject>>,
  formData: FormData
) {
  const supabase = await createServerSupabaseClient();
  const name = formData.get('name') as string;

  const projectKey = name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 4);

  return projectsHandler.createProject(supabase, {
    name,
    description: formData.get('description') as string,
    key: `PROJ${Date.now()}${projectKey}`,
    visibility: formData.get('visibility') as 'private' | 'public',
  });
}
