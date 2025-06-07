import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

import { AdminHeader } from '~/domains/admin/widgets/header';
import { AppLayout } from '~/domains/global/widgets/layout';

export const Route = createFileRoute('/admin/_guard')({
  component: RouteComponent,
  beforeLoad: ({ context: { session } }) => {
    if (!session) {
      // eslint-disable-next-line @typescript-eslint/only-throw-error
      throw redirect({
        to: '/auth/sign-in',
        search: { redirect: location.href },
      });
    }
  },
});

function RouteComponent() {
  return (
    <AppLayout header={<AdminHeader />}>
      <Outlet />
    </AppLayout>
  );
}
