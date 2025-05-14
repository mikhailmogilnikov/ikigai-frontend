import { createFileRoute, Outlet } from '@tanstack/react-router';

import { CompletedCourseModal } from '~/domains/education/entities/course';
import { EducationHeader } from '~/domains/education/widgets/header';
import { PrivateGuard } from '~/domains/global/entities/session';
import { AppLayout } from '~/domains/global/widgets/layout';

export const Route = createFileRoute('/(education)/_guard')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <PrivateGuard role='student'>
      <CompletedCourseModal />
      <AppLayout header={<EducationHeader />}>
        <Outlet />
      </AppLayout>
    </PrivateGuard>
  );
}
