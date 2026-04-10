import { useMemo, useState } from 'react'
import { Button, Field, FieldGroup, FieldLabel, Input } from '@issue-tracker/ui/components'
import { useLanguage } from '#/lib/i18n'
import { useSignup } from '../useSignup'

function PasswordStrength({ password }: { password: string }) {
  const strength = useMemo(() => {
    let score = 0
    if (password.length >= 8) score++
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++
    if (/\d/.test(password)) score++
    if (/[^a-zA-Z0-9]/.test(password)) score++
    return score
  }, [password])

  const colors = ['bg-destructive', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500']

  return (
    <div className="mt-2 flex gap-1">
      {[0, 1, 2, 3].map((index) => (
        <div
          key={index}
          className={`h-1 flex-1 rounded-full transition-colors ${
            index < strength ? colors[strength - 1] : 'bg-muted'
          }`}
        />
      ))}
    </div>
  )
}

export function SignupForm() {
  const { t } = useLanguage()
  const { isPending, data, handleSubmit } = useSignup()
  const [password, setPassword] = useState('')

  return (
    <form onSubmit={handleSubmit} className="mt-6">
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
            aria-invalid={!!data.errors.fullname}
          />
          {data.errors.fullname ? (
            <p className="mt-1 text-xs text-destructive">{data.errors.fullname[0]}</p>
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
            aria-invalid={!!data.errors.email}
          />
          {data.errors.email ? (
            <p className="mt-1 text-xs text-destructive">{data.errors.email[0]}</p>
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-invalid={!!data.errors.password}
          />
          <PasswordStrength password={password} />
          {data.errors.password ? (
            <p className="mt-1 text-xs text-destructive">{data.errors.password[0]}</p>
          ) : null}
        </Field>

        <Field>
          <FieldLabel htmlFor="confirm-password">{t('auth.confirm.password')}</FieldLabel>
          <Input
            id="confirm-password"
            name="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            required
            autoComplete="new-password"
            aria-invalid={!!data.errors.confirmPassword}
          />
          {data.errors.confirmPassword ? (
            <p className="mt-1 text-xs text-destructive">{data.errors.confirmPassword[0]}</p>
          ) : null}
        </Field>
      </FieldGroup>

      {data.message ? (
        <p className="mt-4 text-sm text-destructive">{data.message}</p>
      ) : null}

      <Button type="submit" className="mt-6 w-full" disabled={isPending}>
        {isPending ? 'Creating account...' : t('action.create') + ' Account'}
      </Button>
    </form>
  )
}
