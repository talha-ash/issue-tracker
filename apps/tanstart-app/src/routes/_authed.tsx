import { AppShell } from '#/components/app-shell';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_authed')({
  beforeLoad: ({ context }) => {
    if (!context.user) {
      redirect({ to: '/login', throw: true });
      //   throw new Error('Not authenticated');
    }
  },
  //   errorComponent: ({ error }) => {
  //     console.log('Error mine', error.message);
  //     if (error.message === 'Not authenticated') {
  //       console.log('Redirecting to login');
  //       redirect({ to: '/login' });
  //     }

  //     throw error;
  //   },
  component: () => (
    <AppShell>
      <Outlet />
    </AppShell>
  ),
});
