'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@issue-tracker/ui/components'
import { Input } from '@issue-tracker/ui/components'
import { Field, FieldGroup, FieldLabel } from '@issue-tracker/ui/components'
import { useLanguage } from '@/lib/i18n'

function PasswordStrength({ password }: { password: string }) {
  const strength = useMemo(() => {
    let score = 0
    if (password.length >= 8) score++
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++
    if (/\d/.test(password)) score++
    if (/[^a-zA-Z0-9]/.test(password)) score++
    return score
  }, [password])

  const colors = [
    'bg-destructive',
    'bg-orange-500',
    'bg-yellow-500',
    'bg-green-500',
  ]

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
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate signup
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    router.push('/dashboard')
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="fullname">{t('auth.fullname')}</FieldLabel>
          <Input
            id="fullname"
            type="text"
            placeholder="John Doe"
            required
            autoComplete="name"
          />
        </Field>
        
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
          <FieldLabel htmlFor="password">{t('auth.password')}</FieldLabel>
          <Input
            id="password"
            type="password"
            placeholder="Create a password"
            required
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <PasswordStrength password={password} />
        </Field>
        
        <Field>
          <FieldLabel htmlFor="confirm-password">{t('auth.confirm.password')}</FieldLabel>
          <Input
            id="confirm-password"
            type="password"
            placeholder="Confirm your password"
            required
            autoComplete="new-password"
          />
        </Field>
      </FieldGroup>

      <Button type="submit" className="mt-6 w-full" disabled={isLoading}>
        {isLoading ? 'Creating account...' : t('action.create') + ' Account'}
      </Button>
    </form>
  )
}
