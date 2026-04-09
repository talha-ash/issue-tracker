'use client'

import { Badge } from '@issue-tracker/ui/components'
import { useLanguage } from '@/lib/i18n'
import type { Status } from '@/lib/mock-data'

const statusConfig: Record<Status, { className: string; translationKey: string }> = {
  open: {
    className: 'bg-primary/10 text-primary hover:bg-primary/20 border-primary/20',
    translationKey: 'status.open',
  },
  'in-progress': {
    className: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20 border-amber-500/20',
    translationKey: 'status.in.progress',
  },
  resolved: {
    className: 'bg-green-500/10 text-green-600 dark:text-green-400 hover:bg-green-500/20 border-green-500/20',
    translationKey: 'status.resolved',
  },
  closed: {
    className: 'bg-muted text-muted-foreground hover:bg-muted/80 border-border',
    translationKey: 'status.closed',
  },
}

export function StatusBadge({ status }: { status: Status }) {
  const { t } = useLanguage()
  const config = statusConfig[status]

  return (
    <Badge variant="outline" className={config.className}>
      {t(config.translationKey)}
    </Badge>
  )
}
