import { createFileRoute, Link, notFound } from '@tanstack/react-router';
import { Plus, Filter, ArrowUpDown } from 'lucide-react';

import { Button, Tabs, TabsContent, TabsList, TabsTrigger  } from '@issue-tracker/ui/components';
import { IssueTable } from '@/components/issues/issue-table';
import { EmptyState } from '@/components/issues/empty-state';
import { MembersTable } from '@/components/projects/members-table';
import { useLanguage } from '@/lib/i18n';
import {
  getIssuesByProjectId,
  getMembersByProjectId,
  getProjectById,
} from '@/lib/mock-data';

export const Route = createFileRoute('/_authed/projects/$projectId/')({
  component: ProjectDetailPage,
  loader: ({ params }) => {
    const project = getProjectById(params.projectId);
    if (!project) {
      // eslint-disable-next-line @typescript-eslint/only-throw-error
      throw notFound();
    }
    return { project };
  },
});

function ProjectDetailPage() {
  const { projectId } = Route.useParams();
  const { project } = Route.useLoaderData();
  const { t } = useLanguage();

  const issues = getIssuesByProjectId(projectId);
  const members = getMembersByProjectId(projectId);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-4">
          <div
            className="flex size-14 shrink-0 items-center justify-center rounded-xl text-xl font-bold text-white"
            style={{ backgroundColor: project.color }}
          >
            {project.key}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">{project.name}</h1>
            <p className="mt-1 text-muted-foreground">{project.description}</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Created {project.createdAt} &middot; {project.memberCount} Members &middot; {project.issueCount} Issues
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link
              to="/projects/$projectId/edit"
              params={{ projectId }}
            >
              {t('project.edit')}
            </Link>
          </Button>
          <Button
            variant="outline"
            className="border-destructive/30 text-destructive hover:bg-destructive/10"
          >
            {t('project.delete')}
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="issues" className="mt-8">
        <TabsList>
          <TabsTrigger value="issues">{t('tab.issues')}</TabsTrigger>
          <TabsTrigger value="members">{t('tab.members')}</TabsTrigger>
        </TabsList>

        <TabsContent value="issues" className="mt-6">
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="mr-2 size-4" />
                {t('action.filter')}
              </Button>
              <Button variant="outline" size="sm">
                <ArrowUpDown className="mr-2 size-4" />
                {t('action.sort')}
              </Button>
            </div>
            <Button size="sm">
              <Plus className="mr-2 size-4" />
              {t('issue.new')}
            </Button>
          </div>

          <div className="mt-4">
            {issues.length > 0 ? (
              <IssueTable issues={issues} projectId={projectId} />
            ) : (
              <EmptyState type="issues" />
            )}
          </div>
        </TabsContent>

        <TabsContent value="members" className="mt-6">
          <div className="flex justify-end">
            <Button variant="outline" size="sm">
              <Plus className="mr-2 size-4" />
              {t('project.add.members')}
            </Button>
          </div>

          <div className="mt-4">
            <MembersTable members={members} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
