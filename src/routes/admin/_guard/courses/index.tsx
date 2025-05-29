import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { AdminCoursesTable } from '~/domains/admin/widgets/courses-table';
import { rqClient } from '~/shared/api';
import { PageLoader } from '~/shared/ui/common/page-loader';

export const Route = createFileRoute('/admin/_guard/courses/')({
  component: RouteComponent,
  loader: ({ context: { queryClient } }) => queryClient.ensureQueryData(rqClient.queryOptions('get', '/admin/courses')),
  pendingComponent: () => <PageLoader type='layout' />,
});

function RouteComponent() {
  const { data } = useSuspenseQuery(rqClient.queryOptions('get', '/admin/courses'));

  return (
    <div className='-m-4'>
      <AdminCoursesTable courses={data} />
    </div>
  );
}
