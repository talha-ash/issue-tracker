'use client';

import { use } from 'react';
import { notFound } from 'next/navigation';
import { IssueAppShell } from '@/components/issue-app-shell';
import { IssueDetail } from '@/components/issues/issue-detail';
import { getIssueById, getProjectById } from '@/lib/mock-data';

interface IssueDetailPageProps {
  params: Promise<{
    projectId: string;
    issueId: string;
  }>;
}

export default function IssueDetailPage({ params }: IssueDetailPageProps) {
  const { projectId, issueId } = use(params);
  const project = getProjectById(projectId);
  const issue = getIssueById(issueId);

  if (!project || !issue) {
    notFound();
  }

  return (
    <IssueAppShell projectId={projectId} currentIssueId={issueId}>
      <div className="p-6">
        <IssueDetail issue={issue} project={project} />
      </div>
    </IssueAppShell>
  );
}
