'use client'

import Link from 'next/link'
import { Plus, Filter, ArrowUpDown } from 'lucide-react'
import { Button } from '@issue-tracker/ui/components'
import { IssueTable } from '@/components/issues/issue-table'
import { EmptyState } from '@/components/issues/empty-state'
import { useLanguage } from '@/lib/i18n'
import { issues, projects } from '@/lib/mock-data'

export default function DashboardPage() {
  const { t } = useLanguage()
  const recentIssues = issues.slice(0, 5)

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{t('nav.dashboard')}</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Welcome back! Here&apos;s an overview of your workspace.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Total Projects', value: projects.length },
          { label: 'Open Issues', value: issues.filter((i) => i.status === 'open').length },
          { label: 'In Progress', value: issues.filter((i) => i.status === 'in-progress').length },
          { label: 'Resolved', value: issues.filter((i) => i.status === 'resolved').length },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-border bg-card p-6"
          >
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className="mt-2 text-3xl font-bold text-foreground">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Issues */}
      <div className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Recent Issues</h2>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 size-4" />
              {t('action.filter')}
            </Button>
            <Button variant="outline" size="sm">
              <ArrowUpDown className="mr-2 size-4" />
              {t('action.sort')}
            </Button>
          </div>
        </div>

        <div className="mt-4">
          {recentIssues.length > 0 ? (
            <IssueTable issues={recentIssues} projectId="1" />
          ) : (
            <EmptyState type="issues" />
          )}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">{t('nav.projects')}</h2>
          <Button size="sm" asChild>
            <Link href="/projects/new">
              <Plus className="mr-2 size-4" />
              {t('project.new')}
            </Link>
          </Button>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/projects/${project.id}`}
              className="group rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/50"
            >
              <div className="flex items-center gap-3">
                <div
                  className="flex size-10 items-center justify-center rounded-lg text-sm font-bold text-white"
                  style={{ backgroundColor: project.color }}
                >
                  {project.key}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="truncate font-medium text-foreground group-hover:text-primary">
                    {project.name}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {project.issueCount} issues &middot; {project.memberCount} members
                  </p>
                </div>
              </div>
              <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">
                {project.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
