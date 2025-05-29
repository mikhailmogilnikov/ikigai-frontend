import { createFileRoute } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';

import { Container } from '~/shared/ui/primitives/container';
import { PageLoader } from '~/shared/ui/common/page-loader';
import { CourseFullInfo } from '~/domains/education/widgets/course-full-info';
import { rqClient } from '~/shared/api';

export const Route = createFileRoute('/(education)/_guard/courses_/$course')({
  component: RouteComponent,
  pendingComponent: () => <PageLoader type='layout' />,
  loader: ({ context: { queryClient }, params: { course } }) =>
    queryClient.ensureQueryData(
      rqClient.queryOptions('get', '/courses/{courseId}', { params: { path: { courseId: course } } }),
    ),
});

function RouteComponent() {
  const { course: courseId } = Route.useParams();
  const { data } = useSuspenseQuery(
    rqClient.queryOptions('get', '/courses/{courseId}', { params: { path: { courseId } } }),
  );

  return (
    <Container>
      <CourseFullInfo course={data} />
    </Container>
  );
}
