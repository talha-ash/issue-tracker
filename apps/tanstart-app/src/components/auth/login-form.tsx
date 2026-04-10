'use client'

import { useState } from 'react'
import { Button } from '@issue-tracker/ui/components'
import { Input } from '@issue-tracker/ui/components'
import { Field, FieldGroup, FieldLabel } from '@issue-tracker/ui/components'
import { useLanguage } from '#/lib/i18n'
import { Link, useNavigate } from '@tanstack/react-router'
import { loginService } from '@issue-tracker/core/context/auth'
import type { LoginFieldErrors } from '@issue-tracker/core/context/auth'
import { useSupabase } from '#/lib/supabase/context'

export function LoginForm() {
  const { t } = useLanguage()
  const navigate = useNavigate()
  const supabase = useSupabase()
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<LoginFieldErrors>({})
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setErrors({})
    setMessage('')

    const form = e.currentTarget
    const result = await loginService(supabase, {
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      password: (form.elements.namedItem('password') as HTMLInputElement).value,
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
            aria-invalid={!!errors.password}
          />
          {errors.password ? (
            <p className="mt-1 text-xs text-destructive">{errors.password[0]}</p>
          ) : null}
        </Field>
      </FieldGroup>

      {message ? <p className="mt-4 text-sm text-destructive">{message}</p> : null}

      <Button type="submit" className="mt-6 w-full" disabled={isLoading}>
        {isLoading ? 'Signing in...' : t('auth.signin')}
      </Button>
    </form>
  )
}
