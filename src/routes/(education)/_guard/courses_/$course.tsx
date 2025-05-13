import { createFileRoute } from '@tanstack/react-router';

import { Container } from '~/shared/ui/primitives/container';
import { fetchClient } from '~/shared/api';
import { Typo } from '~/shared/ui/primitives/typo';
import { PageLoader } from '~/shared/ui/common/page-loader';
export const Route = createFileRoute('/(education)/_guard/courses_/$course')({
  component: RouteComponent,
  pendingComponent: () => <PageLoader type='layout' />,
  loader: async ({ params: { course } }) => {
    const data = await fetchClient.GET('/courses/{courseId}', { params: { path: { courseId: course } } });

    return {
      course: data.data,
    };
  },
});

function RouteComponent() {
  const { course } = Route.useLoaderData();

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
