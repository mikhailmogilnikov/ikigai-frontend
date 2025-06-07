import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

import { CompletedCourseModal } from '~/domains/education/entities/course';
import { EducationHeader } from '~/domains/education/widgets/header';
import { AppLayout } from '~/domains/global/widgets/layout';

export const Route = createFileRoute('/(education)/_guard')({
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
    <>
      <CompletedCourseModal />
      <AppLayout header={<EducationHeader />}>
        <Outlet />
      </AppLayout>
    </>
  );
}
