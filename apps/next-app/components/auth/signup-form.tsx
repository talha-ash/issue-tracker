'use client';

import { useActionState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Button,
  Input,
  Field,
  FieldGroup,
  FieldLabel,
} from '@issue-tracker/ui/components';

import { useLanguage } from '@/lib/i18n';
import { signupAction, SignupState } from '@/app/actions/auth';

export const signupInitialState: SignupState = {
  success: false,
  errors: {},
  message: '',
};

export function SignupForm() {
  const { t } = useLanguage();
  const router = useRouter();

  const [state, formAction, isPending] = useActionState(
    signupAction,
    signupInitialState
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
          <FieldLabel htmlFor="fullname">{t('auth.fullname')}</FieldLabel>
          <Input
            id="fullname"
            name="fullname"
            type="text"
            placeholder="John Doe"
            required
            autoComplete="name"
            defaultValue={state.values?.fullname ?? ''}
            aria-invalid={!!state.errors.fullname}
          />
          {state.errors.fullname ? (
            <p className="mt-1 text-xs text-destructive">
              {state.errors.fullname[0]}
            </p>
          ) : null}
        </Field>

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
          <FieldLabel htmlFor="password">{t('auth.password')}</FieldLabel>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Create a password"
            required
            autoComplete="new-password"
            aria-invalid={!!state.errors.password}
          />
          {state.errors.password ? (
            <p className="mt-1 text-xs text-destructive">
              {state.errors.password[0]}
            </p>
          ) : null}
        </Field>

        <Field>
          <FieldLabel htmlFor="confirm-password">
            {t('auth.confirm.password')}
          </FieldLabel>
          <Input
            id="confirm-password"
            name="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            required
            autoComplete="new-password"
            aria-invalid={!!state.errors.confirmPassword}
          />
          {state.errors.confirmPassword ? (
            <p className="mt-1 text-xs text-destructive">
              {state.errors.confirmPassword[0]}
            </p>
          ) : null}
        </Field>
      </FieldGroup>

      {state.message && !state.success ? (
        <p className="mt-4 text-sm text-destructive">{state.message}</p>
      ) : null}

      <Button type="submit" className="mt-6 w-full" disabled={isPending}>
        {isPending ? 'Creating account...' : t('action.create') + ' Account'}
      </Button>
    </form>
  );
}
