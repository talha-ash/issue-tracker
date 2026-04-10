import {
  Button,
  Field,
  FieldGroup,
  FieldLabel,
  Input,
} from '@issue-tracker/ui/components';
import { Link } from '@tanstack/react-router';
import { useLanguage } from '#/lib/i18n';
import { useLogin } from '../useLogin';

export function LoginForm() {
  const { t } = useLanguage();
  const { isPending, data, handleSubmit } = useLogin();

  return (
    <form onSubmit={handleSubmit} className="mt-6">
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
            aria-invalid={!!data.errors.email}
          />
          {data.errors.email ? (
            <p className="mt-1 text-xs text-destructive">
              {data.errors.email[0]}
            </p>
          ) : null}
        </Field>

        <Field>
          <div className="flex items-center justify-between">
            <FieldLabel htmlFor="password">{t('auth.password')}</FieldLabel>
            <Link to="/login" className="text-xs text-primary hover:underline">
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
            aria-invalid={!!data.errors.password}
          />
          {data.errors.password ? (
            <p className="mt-1 text-xs text-destructive">
              {data.errors.password[0]}
            </p>
          ) : null}
        </Field>
      </FieldGroup>

      {data.message ? (
        <p className="mt-4 text-sm text-destructive">{data.message}</p>
      ) : null}

      <Button type="submit" className="mt-6 w-full" disabled={isPending}>
        {isPending ? 'Signing in...' : t('auth.signin')}
      </Button>
    </form>
  );
}
