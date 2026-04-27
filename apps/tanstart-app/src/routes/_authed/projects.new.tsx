import { createFileRoute } from '@tanstack/react-router';

import { CreateProjectForm } from '#/feature/createProject/components/create-project-form';
import { useLanguage } from '#/lib/i18n';

export const Route = createFileRoute('/_authed/projects/new')({
  component: NewProjectPage,
});

function NewProjectPage() {
  const { t } = useLanguage();

  return (
    <div className="p-6">
      <div className="max-w-2xl">
        <h1 className="text-2xl font-bold text-foreground">
          {t('project.create')}
        </h1>
        <p className="mt-1 text-muted-foreground">{t('project.setup')}</p>
      </div>

      <CreateProjectForm className="mt-8" />
    </div>
  );
}
