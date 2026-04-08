'use client'

import { ClipboardList, FolderKanban, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/lib/i18n'

interface EmptyStateProps {
  type: 'issues' | 'projects'
  onAction?: () => void
}

export function EmptyState({ type, onAction }: EmptyStateProps) {
  const { t } = useLanguage()

  const config = {
    issues: {
      icon: ClipboardList,
      title: t('empty.issues'),
      description: t('empty.issues.desc'),
      actionLabel: t('issue.create'),
    },
    projects: {
      icon: FolderKanban,
      title: t('empty.projects'),
      description: t('empty.projects.desc'),
      actionLabel: t('project.create'),
    },
  }

  const { icon: Icon, title, description, actionLabel } = config[type]

  return (
    <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-border p-12">
      <div className="flex size-16 items-center justify-center rounded-full bg-muted">
        <Icon className="size-8 text-muted-foreground" />
      </div>
      <h3 className="mt-6 text-lg font-medium text-foreground">{title}</h3>
      <p className="mt-2 text-center text-sm text-muted-foreground">{description}</p>
      <Button className="mt-6" onClick={onAction}>
        <Plus className="mr-2 size-4" />
        {actionLabel}
      </Button>
    </div>
  )
}
