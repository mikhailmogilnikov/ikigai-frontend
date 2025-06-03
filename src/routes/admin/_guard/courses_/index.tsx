import { createFileRoute } from '@tanstack/react-router';

import { AdminCoursesTable } from '~/domains/admin/widgets/courses-table';
import { rqClient } from '~/shared/api';

export const Route = createFileRoute('/admin/_guard/courses_/')({
  component: RouteComponent,
  loader: ({ context: { queryClient } }) => queryClient.ensureQueryData(rqClient.queryOptions('get', '/admin/courses')),
});

function RouteComponent() {
  const { data } = rqClient.useSuspenseQuery('get', '/admin/courses');

  return (
    <div className='-m-4'>
      <AdminCoursesTable courses={data} />
    </div>
  );
}
