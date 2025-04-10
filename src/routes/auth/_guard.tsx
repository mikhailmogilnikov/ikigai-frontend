import { createFileRoute, Outlet } from '@tanstack/react-router';

import { AuthGuard } from '~/domains/global/entities/session';

export const Route = createFileRoute('/auth/_guard')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AuthGuard>
      <Outlet />
    </AuthGuard>
  );
}
