'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@issue-tracker/ui/components'
import { Button } from '@issue-tracker/ui/components'
import { Input } from '@issue-tracker/ui/components'
import { Textarea } from '@issue-tracker/ui/components'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@issue-tracker/ui/components'
import { Field, FieldGroup, FieldLabel } from '@issue-tracker/ui/components'
import { Separator } from '@issue-tracker/ui/components'
import { useLanguage } from '@/lib/i18n'
import { users, type Issue, type Status, type Priority } from '@/lib/mock-data'

interface IssueModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  issue?: Issue
  projectId: string
}

export function IssueModal({ open, onOpenChange, issue, projectId }: IssueModalProps) {
  const { t } = useLanguage()
  const [isLoading, setIsLoading] = useState(false)

  const isEditing = !!issue

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? t('issue.update') : t('issue.create')}
          </DialogTitle>
        </DialogHeader>

        <Separator />

        <form onSubmit={handleSubmit}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="title">{t('issue.title')}</FieldLabel>
              <Input
                id="title"
                defaultValue={issue?.title}
                placeholder="Enter issue title"
                required
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="description">{t('issue.description')}</FieldLabel>
              <Textarea
                id="description"
                defaultValue={issue?.description}
                placeholder="Describe the issue"
                rows={4}
                className="resize-y"
              />
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel htmlFor="status">{t('issue.status')}</FieldLabel>
                <Select defaultValue={issue?.status || 'open'}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="open">{t('status.open')}</SelectItem>
                    <SelectItem value="in-progress">{t('status.in.progress')}</SelectItem>
                    <SelectItem value="resolved">{t('status.resolved')}</SelectItem>
                    <SelectItem value="closed">{t('status.closed')}</SelectItem>
                  </SelectContent>
                </Select>
              </Field>

              <Field>
                <FieldLabel htmlFor="priority">{t('issue.priority')}</FieldLabel>
                <Select defaultValue={issue?.priority || 'medium'}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="urgent">{t('priority.urgent')}</SelectItem>
                    <SelectItem value="high">{t('priority.high')}</SelectItem>
                    <SelectItem value="medium">{t('priority.medium')}</SelectItem>
                    <SelectItem value="low">{t('priority.low')}</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel htmlFor="assignee">{t('issue.assignee')}</FieldLabel>
                <Select defaultValue={issue?.assignee?.id}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select assignee" />
                  </SelectTrigger>
                  <SelectContent>
                    {users.map((user) => (
                      <SelectItem key={user.id} value={user.id}>
                        {user.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>

              <Field>
                <FieldLabel htmlFor="dueDate">{t('issue.due.date')}</FieldLabel>
                <Input
                  id="dueDate"
                  type="date"
                  defaultValue={issue?.dueDate}
                />
              </Field>
            </div>
          </FieldGroup>

          <Separator className="my-6" />

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              {t('action.cancel')}
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading
                ? 'Saving...'
                : isEditing
                ? t('action.save')
                : t('issue.create')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
