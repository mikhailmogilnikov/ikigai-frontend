import { createFileRoute, Navigate, Outlet } from '@tanstack/react-router';

import { useSession } from '~/domains/global/entities/session';

export const Route = createFileRoute('/auth/_guard')({
  component: RouteComponent,
});

function RouteComponent() {
  const { isAuthenticated, user } = useSession();

  if (isAuthenticated) {
    switch (user?.role) {
      case 'admin':
        return <Navigate to='/admin/dashboard' />;
      case 'student':
        return <Navigate to='/' />;
    }
  }

  return <Outlet />;
}
