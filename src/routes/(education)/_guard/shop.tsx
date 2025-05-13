import { useLingui } from '@lingui/react/macro';
import { createFileRoute } from '@tanstack/react-router';

import { CourseCard } from '~/domains/education/entities/course';
import { CoursesSection } from '~/domains/education/widgets/course-section';
import { fetchClient } from '~/shared/api';
import { PageLoader } from '~/shared/ui/common/page-loader';
import { Container } from '~/shared/ui/primitives/container';

export const Route = createFileRoute('/(education)/_guard/shop')({
  component: RouteComponent,
  pendingComponent: () => <PageLoader type='layout' />,
  loader: async () => {
    const data = await fetchClient.GET('/courses/store');

    return {
      courses: data.data,
    };
  },
});

function RouteComponent() {
  const { t } = useLingui();
  const { courses } = Route.useLoaderData();

  return (
    <Container>
      <CoursesSection title={t`Магазин курсов`}>
        {courses?.map((course) => <CourseCard key={course.id} {...course} variant='shop' />)}
      </CoursesSection>
    </Container>
  );
}
