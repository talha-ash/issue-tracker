'use client'

import { useLanguage } from '@/lib/i18n'
import type { Priority } from '@/lib/mock-data'

const priorityConfig: Record<Priority, { dotColor: string; translationKey: string }> = {
  urgent: {
    dotColor: 'bg-red-500',
    translationKey: 'priority.urgent',
  },
  high: {
    dotColor: 'bg-orange-500',
    translationKey: 'priority.high',
  },
  medium: {
    dotColor: 'bg-yellow-500',
    translationKey: 'priority.medium',
  },
  low: {
    dotColor: 'bg-muted-foreground',
    translationKey: 'priority.low',
  },
}

export function PriorityBadge({ priority }: { priority: Priority }) {
  const { t } = useLanguage()
  const config = priorityConfig[priority]

  return (
    <div className="flex items-center gap-1.5">
      <span className={`size-2 rounded-full ${config.dotColor}`} />
      <span className="text-sm text-muted-foreground">
        {t(config.translationKey)}
      </span>
    </div>
  )
}
