'use client';

import { useActionState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Button,
  Input,
  Field,
  FieldGroup,
  FieldLabel,
} from '@issue-tracker/ui/components';

import { useLanguage } from '@/lib/i18n';
import { loginAction, LoginState } from '@/app/actions/auth';

export const loginInitialState: LoginState = {
  success: false,
  errors: {},
  message: '',
};

export function LoginForm() {
  const { t } = useLanguage();
  const router = useRouter();

  const [state, formAction, isPending] = useActionState(
    loginAction,
    loginInitialState
  );

  useEffect(() => {
    if (state.success) {
      router.push('/');
    }
  }, [state.success, router]);

  return (
    <form action={formAction} className="mt-6">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="email">{t('auth.email')}</FieldLabel>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="name@example.com"
            required
            autoComplete="email"
            defaultValue={state.values?.email ?? ''}
            aria-invalid={!!state.errors.email}
          />
          {state.errors.email ? (
            <p className="mt-1 text-xs text-destructive">
              {state.errors.email[0]}
            </p>
          ) : null}
        </Field>

        <Field>
          <div className="flex items-center justify-between">
            <FieldLabel htmlFor="password">{t('auth.password')}</FieldLabel>
            <Link
              href="/forgot-password"
              className="text-xs text-primary hover:underline"
            >
              {t('auth.forgot')}
            </Link>
          </div>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            required
            autoComplete="current-password"
            aria-invalid={!!state.errors.password}
          />
          {state.errors.password ? (
            <p className="mt-1 text-xs text-destructive">
              {state.errors.password[0]}
            </p>
          ) : null}
        </Field>
      </FieldGroup>

      {state.message && !state.success ? (
        <p className="mt-4 text-sm text-destructive">{state.message}</p>
      ) : null}

      <Button type="submit" className="mt-6 w-full" disabled={isPending}>
        {isPending ? 'Signing in...' : t('auth.signin')}
      </Button>
    </form>
  );
}
