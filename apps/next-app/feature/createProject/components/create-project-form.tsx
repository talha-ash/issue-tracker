'use client';

import { useLanguage } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import {
  Button,
  Field,
  FieldGroup,
  FieldLabel,
  Input,
  Textarea,
} from '@issue-tracker/ui/components';
import { Globe, Lock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useCreateProject } from '../useCreateProject';

interface CreateProjectFormProps {
  className?: string;
}

export function CreateProjectForm({ className }: CreateProjectFormProps) {
  const { t } = useLanguage();
  const router = useRouter();
  const { state, formAction, isPending } = useCreateProject();
  const [visibility, setVisibility] = useState<'private' | 'public'>(
    state.values?.visibility ?? 'private'
  );

  if (state.success) {
    router.replace('/');
    return null;
  }

  return (
    <form action={formAction} className={cn('max-w-2xl', className)}>
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="name">{t('project.name')}</FieldLabel>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Enter project name"
              required
              defaultValue={state.values?.name ?? ''}
              aria-invalid={!!state.errors.name}
            />
            {state.errors.name ? (
              <p className="mt-1 text-xs text-destructive">
                {state.errors.name[0]}
              </p>
            ) : null}
          </Field>

          <Field>
            <FieldLabel htmlFor="key">{t('project.key')}</FieldLabel>
            <Input
              id="key"
              name="key"
              type="text"
              placeholder="Auto-generated from project name"
              readOnly
              className="font-mono"
              aria-invalid={!!state.errors.key}
            />
            <p className="mt-1 text-xs text-muted-foreground">
              Key is auto-generated from your project name
            </p>
            {state.errors.key ? (
              <p className="mt-1 text-xs text-destructive">
                {state.errors.key[0]}
              </p>
            ) : null}
          </Field>

          <Field>
            <FieldLabel htmlFor="description">
              {t('project.description')}
            </FieldLabel>
            <Textarea
              id="description"
              name="description"
              placeholder="Describe your project"
              rows={5}
              className="resize-y"
              defaultValue={state.values?.description ?? ''}
              aria-invalid={!!state.errors.description}
            />
            {state.errors.description ? (
              <p className="mt-1 text-xs text-destructive">
                {state.errors.description[0]}
              </p>
            ) : null}
          </Field>

          <Field>
            <FieldLabel>{t('project.visibility')}</FieldLabel>
            <div className="mt-2 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  setVisibility('private');
                }}
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
                onClick={() => {
                  setVisibility('public');
                }}
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
            <input type="hidden" name="visibility" value={visibility} />
            {state.errors.visibility ? (
              <p className="mt-1 text-xs text-destructive">
                {state.errors.visibility[0]}
              </p>
            ) : null}
          </Field>
        </FieldGroup>
      </div>

      {state.message ? (
        <p className="mt-4 text-sm text-destructive">{state.message}</p>
      ) : null}

      <div className="mt-6 flex justify-end gap-3">
        <Button
          type="button"
          variant="ghost"
          onClick={() => {
            router.back();
          }}
          disabled={isPending}
        >
          {t('action.cancel')}
        </Button>
        <Button type="submit" disabled={isPending}>
          {isPending ? 'Saving...' : t('project.create')}
        </Button>
      </div>
    </form>
  );
}
