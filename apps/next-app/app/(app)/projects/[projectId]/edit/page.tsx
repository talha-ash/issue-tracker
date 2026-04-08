'use client'

import { use } from 'react'
import { notFound } from 'next/navigation'
import { ProjectForm } from '@/components/projects/project-form'
import { useLanguage } from '@/lib/i18n'
import { getProjectById } from '@/lib/mock-data'

interface EditProjectPageProps {
  params: Promise<{
    projectId: string
  }>
}

export default function EditProjectPage({ params }: EditProjectPageProps) {
  const { projectId } = use(params)
  const { t } = useLanguage()
  const project = getProjectById(projectId)

  if (!project) {
    notFound()
  }

  return (
    <div className="p-6">
      <div className="max-w-2xl">
        <h1 className="text-2xl font-bold text-foreground">{t('project.update')}</h1>
      </div>

      <ProjectForm className="mt-8" project={project} />
    </div>
  )
}
