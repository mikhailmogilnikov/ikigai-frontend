import { createFileRoute, Outlet } from '@tanstack/react-router';

import { AdminHeader } from '~/domains/admin/widgets/header';
import { PrivateGuard } from '~/domains/global/entities/session';
import { AppLayout } from '~/domains/global/widgets/layout';

export const Route = createFileRoute('/admin/_guard')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <PrivateGuard role='admin'>
      <AppLayout header={<AdminHeader />}>
        <Outlet />
      </AppLayout>
    </PrivateGuard>
  );
}
