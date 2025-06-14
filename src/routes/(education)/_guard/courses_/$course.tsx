import { createFileRoute } from '@tanstack/react-router';

import { Container } from '~/shared/ui/primitives/container';
import { CourseFullInfo } from '~/domains/education/widgets/course-full-info';
import { rqClient } from '~/shared/api';

export const Route = createFileRoute('/(education)/_guard/courses_/$course')({
  component: RouteComponent,
  loader: ({ context: { queryClient }, params: { course } }) =>
    queryClient.ensureQueryData(
      rqClient.queryOptions('get', '/courses/{courseId}', { params: { path: { courseId: course } } }),
    ),
});

function RouteComponent() {
  const { course: courseId } = Route.useParams();
  const { data } = rqClient.useSuspenseQuery('get', '/courses/{courseId}', { params: { path: { courseId } } });

  return (
    <Container>
      <CourseFullInfo course={data} />
    </Container>
  );
}
