import { createFileRoute, Outlet } from '@tanstack/react-router';

import { EducationHeader } from '~/domains/education/widgets/header';
import { PrivateGuard } from '~/domains/global/entities/session';
import { AppLayout } from '~/domains/global/widgets/layout';

export const Route = createFileRoute('/(education)/_guard')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <PrivateGuard role='student'>
      <AppLayout header={<EducationHeader />}>
        <Outlet />
      </AppLayout>
    </PrivateGuard>
  );
}
