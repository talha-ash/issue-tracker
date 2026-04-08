'use client'

import Link from 'next/link'
import { useLanguage } from '@/lib/i18n'
import { LoginForm } from '@/components/auth/login-form'
import { SocialAuth } from '@/components/auth/social-auth'
import { AuthHeader } from '@/components/auth/auth-header'

export default function LoginPage() {
  const { t } = useLanguage()

  return (
    <div className="flex min-h-svh items-center justify-center bg-muted p-4">
      <div className="w-full max-w-md">
        <div className="rounded-xl border border-border bg-card p-8 shadow-lg">
          <AuthHeader />
          
          <div className="mt-8 text-center">
            <h1 className="text-2xl font-bold text-card-foreground">
              {t('auth.welcome')}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {t('auth.signin.subtitle')}
            </p>
          </div>

          <LoginForm />

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                {t('auth.or')}
              </span>
            </div>
          </div>

          <SocialAuth />

          <p className="mt-6 text-center text-sm text-muted-foreground">
            {t('auth.no.account')}{' '}
            <Link
              href="/signup"
              className="font-medium text-primary hover:underline"
            >
              {t('auth.signup')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
