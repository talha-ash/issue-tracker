'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Lock, Globe, X, Search } from 'lucide-react'
import { Button } from '@issue-tracker/ui/components'
import { Input } from '@issue-tracker/ui/components'
import { Textarea } from '@issue-tracker/ui/components'
import { Field, FieldGroup, FieldLabel } from '@issue-tracker/ui/componentsfield'
import { Avatar, AvatarFallback } from '@issue-tracker/ui/components'
import { useLanguage } from '@/lib/i18n'
import { users, type Project, type User } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

interface ProjectFormProps {
  project?: Project
  className?: string
}

export function ProjectForm({ project, className }: ProjectFormProps) {
  const { t } = useLanguage()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [name, setName] = useState(project?.name || '')
  const [visibility, setVisibility] = useState<'private' | 'public'>(project?.visibility || 'private')
  const [selectedMembers, setSelectedMembers] = useState<User[]>([])
  const [searchQuery, setSearchQuery] = useState('')

  const projectKey = name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 4) || 'PROJ'

  const filteredUsers = users.filter(
    (user) =>
      !selectedMembers.find((m) => m.id === user.id) &&
      (user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    router.push('/dashboard')
  }

  const addMember = (user: User) => {
    setSelectedMembers([...selectedMembers, user])
    setSearchQuery('')
  }

  const removeMember = (userId: string) => {
    setSelectedMembers(selectedMembers.filter((m) => m.id !== userId))
  }

  return (
    <form onSubmit={handleSubmit} className={cn('max-w-2xl', className)}>
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="name">{t('project.name')}</FieldLabel>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter project name"
              required
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="key">{t('project.key')}</FieldLabel>
            <Input
              id="key"
              value={projectKey}
              readOnly
              className="font-mono"
            />
            <p className="mt-1 text-xs text-muted-foreground">
              Key will be: {projectKey}
            </p>
          </Field>

          <Field>
            <FieldLabel htmlFor="description">{t('project.description')}</FieldLabel>
            <Textarea
              id="description"
              placeholder="Describe your project"
              defaultValue={project?.description}
              rows={5}
              className="resize-y"
            />
          </Field>

          <Field>
            <FieldLabel>{t('project.visibility')}</FieldLabel>
            <div className="mt-2 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setVisibility('private')}
                className={cn(
                  'flex flex-col items-start rounded-lg border-2 p-4 text-left transition-colors',
                  visibility === 'private'
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                )}
              >
                <Lock className="size-5 text-muted-foreground" />
                <span className="mt-2 font-medium">{t('project.private')}</span>
                <span className="mt-1 text-xs text-muted-foreground">
                  {t('project.private.desc')}
                </span>
              </button>
              <button
                type="button"
                onClick={() => setVisibility('public')}
                className={cn(
                  'flex flex-col items-start rounded-lg border-2 p-4 text-left transition-colors',
                  visibility === 'public'
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                )}
              >
                <Globe className="size-5 text-muted-foreground" />
                <span className="mt-2 font-medium">{t('project.public')}</span>
                <span className="mt-1 text-xs text-muted-foreground">
                  {t('project.public.desc')}
                </span>
              </button>
            </div>
          </Field>

          <Field>
            <FieldLabel>{t('project.add.members')}</FieldLabel>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('project.search.members')}
                className="pl-9"
              />
            </div>

            {/* Selected members */}
            {selectedMembers.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {selectedMembers.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1"
                  >
                    <Avatar className="size-5">
                      <AvatarFallback className="bg-primary text-primary-foreground text-[10px]">
                        {member.initials}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{member.name}</span>
                    <button
                      type="button"
                      onClick={() => removeMember(member.id)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <X className="size-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Search results */}
            {searchQuery && filteredUsers.length > 0 && (
              <div className="mt-2 rounded-lg border border-border bg-popover shadow-md">
                {filteredUsers.slice(0, 5).map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-3 hover:bg-accent"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="size-8">
                        <AvatarFallback className="bg-secondary text-xs">
                          {user.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addMember(user)}
                    >
                      {t('action.add')}
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </Field>
        </FieldGroup>
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <Button
          type="button"
          variant="ghost"
          onClick={() => router.back()}
          disabled={isLoading}
        >
          {t('action.cancel')}
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading
            ? 'Saving...'
            : project
            ? t('action.save')
            : t('project.create')}
        </Button>
      </div>
    </form>
  )
}
