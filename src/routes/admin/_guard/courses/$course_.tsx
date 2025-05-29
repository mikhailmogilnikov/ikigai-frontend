import { createFileRoute } from '@tanstack/react-router';

import { rqClient } from '~/shared/api';
import { PageLoader } from '~/shared/ui/common/page-loader';
import { Container } from '~/shared/ui/primitives/container';

export const Route = createFileRoute('/admin/_guard/courses/$course_')({
  component: RouteComponent,
  loader: ({ context: { queryClient }, params: { course } }) =>
    queryClient.ensureQueryData(
      rqClient.queryOptions('get', '/admin/courses/{courseId}', { params: { path: { courseId: course } } }),
    ),
  pendingComponent: () => <PageLoader type='layout' />,
});

function RouteComponent() {
  const { course } = Route.useParams();

  const { data } = rqClient.useSuspenseQuery('get', '/admin/courses/{courseId}', {
    params: { path: { courseId: course } },
  });

  return <Container>{JSON.stringify(data)}</Container>;
}
