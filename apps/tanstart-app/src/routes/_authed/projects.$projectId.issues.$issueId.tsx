import { createFileRoute, notFound } from '@tanstack/react-router';

import { IssueAppShell } from '@/components/issue-app-shell';
import { IssueDetail } from '@/components/issues/issue-detail';
import { getIssueById, getProjectById } from '@/lib/mock-data';

export const Route = createFileRoute('/_authed/projects/$projectId/issues/$issueId')({
  component: IssueDetailPage,
  loader: ({ params }) => {
    const project = getProjectById(params.projectId);
    const issue = getIssueById(params.issueId);
    if (!project || !issue) {
       notFound();
    }
    return { project, issue };
  },
});

function IssueDetailPage() {
  const { projectId, issueId } = Route.useParams();
  const { project, issue } = Route.useLoaderData();

  return (
    <IssueAppShell projectId={projectId} currentIssueId={issueId}>
      <div className="p-6">
        <IssueDetail issue={issue} project={project} />
      </div>
    </IssueAppShell>
  );
}
