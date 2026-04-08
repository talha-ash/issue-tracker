'use client'

import Link from 'next/link'
import { Button } from '@issue-tracker/ui/components'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@issue-tracker/ui/components'
import { Avatar, AvatarFallback } from '@issue-tracker/ui/components'
import { StatusBadge } from './status-badge'
import { PriorityBadge } from './priority-badge'
import { useLanguage } from '@/lib/i18n'
import type { Issue } from '@/lib/mock-data'

interface IssueTableProps {
  issues: Issue[]
  projectId: string
  onEdit?: (issue: Issue) => void
  onDelete?: (issue: Issue) => void
}

export function IssueTable({ issues, projectId, onEdit, onDelete }: IssueTableProps) {
  const { t } = useLanguage()

  return (
    <div className="rounded-lg border border-border">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-12">{t('table.number')}</TableHead>
            <TableHead>{t('issue.status')}</TableHead>
            <TableHead className="min-w-[200px]">{t('table.title')}</TableHead>
            <TableHead>{t('issue.priority')}</TableHead>
            <TableHead>{t('issue.assignee')}</TableHead>
            <TableHead>{t('issue.due.date')}</TableHead>
            <TableHead className="text-right">{t('table.actions')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {issues.map((issue, index) => (
            <TableRow
              key={issue.id}
              className={index % 2 === 0 ? 'bg-muted/30' : ''}
            >
              <TableCell className="font-mono text-muted-foreground">
                {issue.number}
              </TableCell>
              <TableCell>
                <StatusBadge status={issue.status} />
              </TableCell>
              <TableCell>
                <Link
                  href={`/projects/${projectId}/issues/${issue.id}`}
                  className="font-medium hover:text-primary hover:underline"
                >
                  {issue.title}
                </Link>
              </TableCell>
              <TableCell>
                <PriorityBadge priority={issue.priority} />
              </TableCell>
              <TableCell>
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
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {issue.dueDate || '-'}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit?.(issue)}
                  >
                    {t('action.edit')}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-destructive/30 text-destructive hover:bg-destructive/10"
                    onClick={() => onDelete?.(issue)}
                  >
                    {t('action.delete')}
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
