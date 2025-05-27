import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { adminCoursesQuery } from '~/domains/admin/entities/course';
import { AdminCoursesTable } from '~/domains/admin/widgets/courses-table';
import { PageLoader } from '~/shared/ui/common/page-loader';

export const Route = createFileRoute('/admin/_guard/courses/')({
  component: RouteComponent,
  loader: ({ context: { queryClient } }) => queryClient.ensureQueryData(adminCoursesQuery),
  pendingComponent: () => <PageLoader type='layout' />,
});

function RouteComponent() {
  const {
    data: { data: courses },
  } = useSuspenseQuery(adminCoursesQuery);

  if (!courses) return null;

  return (
    <div className='-m-4'>
      <AdminCoursesTable courses={courses} />
    </div>
  );
}
