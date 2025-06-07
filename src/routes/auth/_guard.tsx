/* eslint-disable @typescript-eslint/only-throw-error */

import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

import { AuthLayout } from '~/domains/global/widgets/auth-layout';

export const Route = createFileRoute('/auth/_guard')({
  component: RouteComponent,
  beforeLoad: ({ context: { session } }) => {
    if (session) {
      switch (session.role) {
        case 'student':
          throw redirect({ to: '/' });
        case 'admin':
          throw redirect({ to: '/admin/courses' });
      }
    }
  },
});

function RouteComponent() {
  return (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  );
}
