'use server';

import { createBackendClient } from '@/lib/backend';
import { createHandlers } from '@issue-tracker/server';

export type {
  CreateProjectFieldErrors,
  CreateProjectState,
  CreateProjectValues,
} from '@issue-tracker/server';

export async function createProjectAction(
  _prev: Awaited<ReturnType<typeof createHandlers>>,
  formData: FormData
) {
  const backend = await createBackendClient();
  const name = formData.get('name') as string;

  const projectKey = name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 4);

  const dateNow = Date.now().toString();
  return createHandlers(backend).projectsHandlers.createProjectHandler({
    name,
    description: formData.get('description') as string,
    key: `PROJ${dateNow}${projectKey}`,
    visibility: formData.get('visibility') as 'private' | 'public',
  });
}
