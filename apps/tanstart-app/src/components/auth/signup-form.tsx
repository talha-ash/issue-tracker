'use client'

import { useMemo, useState } from 'react'
import { Button } from '@issue-tracker/ui/components'
import { Input } from '@issue-tracker/ui/components'
import { Field, FieldGroup, FieldLabel } from '@issue-tracker/ui/components'
import { useLanguage } from '#/lib/i18n'
import { useNavigate } from '@tanstack/react-router'
import { signupService } from '@issue-tracker/core/context/auth'
import type { SignupFieldErrors } from '@issue-tracker/core/context/auth'
import { useSupabase } from '#/lib/supabase/context'

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
  const navigate = useNavigate()
  const supabase = useSupabase()
  const [isLoading, setIsLoading] = useState(false)
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<SignupFieldErrors>({})
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setErrors({})
    setMessage('')

    const form = e.currentTarget
    const result = await signupService(supabase, {
      fullname: (form.elements.namedItem('fullname') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      password: (form.elements.namedItem('password') as HTMLInputElement).value,
      confirmPassword: (form.elements.namedItem('confirmPassword') as HTMLInputElement).value,
    })

    setIsLoading(false)
    if (result.success) {
      navigate({ to: '/dashboard' })
    } else {
      setErrors(result.errors)
      setMessage(result.message)
    }
  }

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
            aria-invalid={!!errors.fullname}
          />
          {errors.fullname ? (
            <p className="mt-1 text-xs text-destructive">{errors.fullname[0]}</p>
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
            aria-invalid={!!errors.email}
          />
          {errors.email ? (
            <p className="mt-1 text-xs text-destructive">{errors.email[0]}</p>
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
            aria-invalid={!!errors.password}
          />
          <PasswordStrength password={password} />
          {errors.password ? (
            <p className="mt-1 text-xs text-destructive">{errors.password[0]}</p>
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
            aria-invalid={!!errors.confirmPassword}
          />
          {errors.confirmPassword ? (
            <p className="mt-1 text-xs text-destructive">{errors.confirmPassword[0]}</p>
          ) : null}
        </Field>
      </FieldGroup>

      {message ? <p className="mt-4 text-sm text-destructive">{message}</p> : null}

      <Button type="submit" className="mt-6 w-full" disabled={isLoading}>
        {isLoading ? 'Creating account...' : t('action.create') + ' Account'}
      </Button>
    </form>
  )
}
