import { createFileRoute, Link } from '@tanstack/react-router';
import { useLanguage } from '#/lib/i18n';
import { SignupForm } from '#/feature/signup/components/signup-form';
import { SocialAuth } from '#/components/auth/social-auth';
import { AuthHeader } from '#/components/auth/auth-header';

export const Route = createFileRoute('/_auth/signup')({
  component: SignupPage,
});

function SignupPage() {
  const { t } = useLanguage();

  return (
    <div className="flex min-h-svh items-center justify-center bg-muted p-4">
      <div className="w-full max-w-md">
        <div className="rounded-xl border border-border bg-card p-8 shadow-lg">
          <AuthHeader />

          <div className="mt-8 text-center">
            <h1 className="text-2xl font-bold text-card-foreground">
              {t('auth.signup.title')}
            </h1>
          </div>

          <SignupForm />

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
            {t('auth.have.account')}{' '}
            <Link
              to="/login"
              className="font-medium text-primary hover:underline"
            >
              {t('auth.signin')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
