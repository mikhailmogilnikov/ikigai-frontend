import { createFileRoute } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';

import { Container } from '~/shared/ui/primitives/container';
import { Typo } from '~/shared/ui/primitives/typo';
import { PageLoader } from '~/shared/ui/common/page-loader';
import { getCourseQuery } from '~/domains/education/entities/course/api';

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
    <Container title={course.title}>
      <Typo as='p' size='base' weight='normal'>
        {course.description}
      </Typo>
    </Container>
  );
}
