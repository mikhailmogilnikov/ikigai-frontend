import { useLingui } from '@lingui/react/macro';
import { createFileRoute } from '@tanstack/react-router';

import { CourseCard } from '~/domains/education/entities/course';
import { CoursesSection } from '~/domains/education/widgets/course-section';
import { PageLoader } from '~/shared/ui/common/page-loader';
import { Container } from '~/shared/ui/primitives/container';
import { rqClient } from '~/shared/api';

export const Route = createFileRoute('/(education)/_guard/shop')({
  component: RouteComponent,
  pendingComponent: () => <PageLoader type='layout' />,
  loader: ({ context: { queryClient } }) => queryClient.ensureQueryData(rqClient.queryOptions('get', '/courses/store')),
});

function RouteComponent() {
  const { t } = useLingui();
  const { data } = rqClient.useSuspenseQuery('get', '/courses/store');

  return (
    <Container>
      <CoursesSection title={t`Магазин курсов`}>
        {data.map((course) => (
          <CourseCard key={course.id} {...course} variant='shop' />
        ))}
      </CoursesSection>
    </Container>
  );
}
