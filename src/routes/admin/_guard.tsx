import { createFileRoute, Outlet } from '@tanstack/react-router';

import { AdminHeader } from '~/domains/admin/widgets/header';
import { PrivateGuard } from '~/domains/global/entities/session';
import { AppLayout } from '~/domains/global/widgets/layout';
import { Toaster } from '~/shared/ui/common/toaster';

export const Route = createFileRoute('/admin/_guard')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <PrivateGuard role='admin'>
      <Toaster />
      <AppLayout header={<AdminHeader />}>
        <Outlet />
      </AppLayout>
    </PrivateGuard>
  );
}
