import { createFileRoute } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';

import { Container } from '~/shared/ui/primitives/container';
import { PageLoader } from '~/shared/ui/common/page-loader';
import { getCourseQuery } from '~/domains/education/entities/course/api';
import { CourseFullInfo } from '~/domains/education/widgets/course-full-info';

export const Route = createFileRoute('/(education)/_guard/courses_/$course')({
  component: RouteComponent,
  pendingComponent: () => <PageLoader type='layout' />,
  loader: ({ context: { queryClient }, params: { course } }) => queryClient.ensureQueryData(getCourseQuery(course)),
});

function RouteComponent() {
  const { course: courseId } = Route.useParams();
  const {
    data: { data: course },
  } = useSuspenseQuery(getCourseQuery(courseId));

  if (!course) {
    return null;
  }

  return (
    <Container>
      <CourseFullInfo course={course} />
    </Container>
  );
}
