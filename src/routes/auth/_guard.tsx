import { createFileRoute, Outlet } from '@tanstack/react-router';

import { AuthGuard } from '~/domains/global/entities/session';
import { AuthLayout } from '~/domains/global/widgets/auth-layout';

export const Route = createFileRoute('/auth/_guard')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AuthGuard>
      <AuthLayout>
        <Outlet />
      </AuthLayout>
    </AuthGuard>
  );
}
