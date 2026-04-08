'use client'

import { useState } from 'react'

import { Button } from '@issue-tracker/ui/components'
import { Input } from '@issue-tracker/ui/components'
import { Field, FieldGroup, FieldLabel } from '@issue-tracker/ui/components'
import { useLanguage } from '@/lib/i18n'
import { Link, useNavigate } from '@tanstack/react-router'

export function LoginForm() {
  const { t } = useLanguage()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate login
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    navigate('/dashboard')
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="email">{t('auth.email')}</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            required
            autoComplete="email"
          />
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
            type="password"
            placeholder="Enter your password"
            required
            autoComplete="current-password"
          />
        </Field>
      </FieldGroup>

      <Button type="submit" className="mt-6 w-full" disabled={isLoading}>
        {isLoading ? 'Signing in...' : t('auth.signin')}
      </Button>
    </form>
  )
}
