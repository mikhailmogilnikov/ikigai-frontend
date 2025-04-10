import { createFileRoute, Navigate, Outlet } from '@tanstack/react-router';

import { useSession } from '~/domains/global/entities/session';

export const Route = createFileRoute('/(education)/_guard')({
  component: RouteComponent,
});

function RouteComponent() {
  const { isAuthenticated, user } = useSession();

  if (!isAuthenticated) {
    return <Navigate to='/auth/sign-in' />;
  }

  if (user?.role !== 'student') {
    return <Navigate to='/' />;
  }

  return <Outlet />;
}
