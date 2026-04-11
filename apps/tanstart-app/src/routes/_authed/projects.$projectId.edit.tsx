import { createFileRoute, notFound } from '@tanstack/react-router';

import { ProjectForm } from '@/components/projects/project-form';
import { useLanguage } from '@/lib/i18n';
import { getProjectById } from '@/lib/mock-data';

export const Route = createFileRoute('/_authed/projects/$projectId/edit')({
  component: EditProjectPage,
  loader: ({ params }) => {
    const project = getProjectById(params.projectId);
    if (!project) {
      // eslint-disable-next-line @typescript-eslint/only-throw-error
      throw notFound();
    }
    return { project };
  },
});

function EditProjectPage() {
  const { project } = Route.useLoaderData();
  const { t } = useLanguage();

  return (
    <div className="p-6">
      <div className="max-w-2xl">
        <h1 className="text-2xl font-bold text-foreground">{t('project.update')}</h1>
      </div>

      <ProjectForm className="mt-8" project={project} />
    </div>
  );
}
