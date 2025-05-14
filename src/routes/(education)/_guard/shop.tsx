import { useLingui } from '@lingui/react/macro';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { CourseCard } from '~/domains/education/entities/course';
import { shopCoursesQuery } from '~/domains/education/entities/course/api';
import { CoursesSection } from '~/domains/education/widgets/course-section';
import { PageLoader } from '~/shared/ui/common/page-loader';
import { Container } from '~/shared/ui/primitives/container';

export const Route = createFileRoute('/(education)/_guard/shop')({
  component: RouteComponent,
  pendingComponent: () => <PageLoader type='layout' />,
  loader: ({ context: { queryClient } }) => queryClient.ensureQueryData(shopCoursesQuery),
});

function RouteComponent() {
  const { t } = useLingui();
  const {
    data: { data: courses },
  } = useSuspenseQuery(shopCoursesQuery);

  return (
    <Container>
      <CoursesSection title={t`Магазин курсов`}>
        {courses?.map((course) => <CourseCard key={course.id} {...course} variant='shop' />)}
      </CoursesSection>
    </Container>
  );
}
