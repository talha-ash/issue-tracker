import { Link } from '@tanstack/react-router';
import {
  Button,
  Avatar,
  AvatarFallback,
  Separator,
} from '@issue-tracker/ui/components';
import { StatusBadge } from './status-badge';
import { PriorityBadge } from './priority-badge';
import { CommentSection } from './comment-section';
import { useLanguage } from '@/lib/i18n';
import { getCommentsByIssueId } from '@/lib/mock-data';
import type { Issue, Project } from '@/lib/mock-data';

interface IssueDetailProps {
  issue: Issue;
  project: Project;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function IssueDetail({
  issue,
  project,
  onEdit,
  onDelete,
}: IssueDetailProps) {
  const { t } = useLanguage();
  const comments = getCommentsByIssueId(issue.id);

  return (
    <div className="flex gap-6">
      {/* Left column - Main content */}
      <div className="flex-1 min-w-0">
        <h1 className="text-2xl font-bold text-foreground">{issue.title}</h1>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <StatusBadge status={issue.status} />
          <PriorityBadge priority={issue.priority} />
          {issue.dueDate ? (
            <span className="text-sm text-muted-foreground">
              {t('issue.due.date')}: {issue.dueDate}
            </span>
          ) : null}
        </div>

        <Separator className="my-6" />

        <div>
          <h3 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {t('issue.description')}
          </h3>
          <p className="mt-3 text-foreground leading-relaxed">
            {issue.description}
          </p>
        </div>

        <Separator className="my-6" />

        <CommentSection issueId={issue.id} comments={comments} />
      </div>

      {/* Right column - Meta info */}
      <div className="w-80 shrink-0">
        <div className="sticky top-6 rounded-xl border border-border bg-muted/30 p-5">
          <dl className="space-y-4">
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {t('nav.projects')}
              </dt>
              <dd className="mt-1">
                <Link
                  to="/projects/$projectId"
                  params={{ projectId: project.id }}
                  className="font-medium text-primary hover:underline"
                >
                  {project.name}
                </Link>
              </dd>
            </div>

            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {t('issue.status')}
              </dt>
              <dd className="mt-1">
                <StatusBadge status={issue.status} />
              </dd>
            </div>

            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {t('issue.priority')}
              </dt>
              <dd className="mt-1">
                <PriorityBadge priority={issue.priority} />
              </dd>
            </div>

            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {t('issue.assignee')}
              </dt>
              <dd className="mt-1">
                {issue.assignee ? (
                  <div className="flex items-center gap-2">
                    <Avatar className="size-6">
                      <AvatarFallback className="bg-secondary text-xs">
                        {issue.assignee.initials}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{issue.assignee.name}</span>
                  </div>
                ) : (
                  <span className="text-sm text-muted-foreground">-</span>
                )}
              </dd>
            </div>

            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {t('issue.reporter')}
              </dt>
              <dd className="mt-1">
                <div className="flex items-center gap-2">
                  <Avatar className="size-6">
                    <AvatarFallback className="bg-secondary text-xs">
                      {issue.reporter.initials}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm">{issue.reporter.name}</span>
                </div>
              </dd>
            </div>

            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {t('issue.created')}
              </dt>
              <dd className="mt-1 text-sm">{issue.createdAt}</dd>
            </div>

            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {t('issue.updated')}
              </dt>
              <dd className="mt-1 text-sm">{issue.updatedAt}</dd>
            </div>
          </dl>

          <Separator className="my-5" />

          <div className="space-y-2">
            <Button variant="outline" className="w-full" onClick={onEdit}>
              {t('issue.edit')}
            </Button>
            <Button
              variant="outline"
              className="w-full border-destructive/30 text-destructive hover:bg-destructive/10"
              onClick={onDelete}
            >
              {t('issue.delete')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
