import { Trans, useLingui } from '@lingui/react/macro';
import { createFileRoute } from '@tanstack/react-router';
import { PiMagnifyingGlass } from 'react-icons/pi';

import { CourseCard } from '~/domains/education/entities/course';
import { CoursesSection } from '~/domains/education/widgets/course-section';
import { Container } from '~/shared/ui/primitives/container';
import { rqClient } from '~/shared/api';
import { BuyCourseModal } from '~/domains/education/features/buy-course';
import { Placeholder } from '~/shared/ui/common/placeholder';
import { LinkButton } from '~/shared/ui/primitives/link-button';

export const Route = createFileRoute('/(education)/_guard/shop')({
  component: RouteComponent,
  loader: ({ context: { queryClient } }) => queryClient.ensureQueryData(rqClient.queryOptions('get', '/courses/store')),
});

function RouteComponent() {
  const { t } = useLingui();
  const { data } = rqClient.useSuspenseQuery('get', '/courses/store');

  return (
    <Container>
      <BuyCourseModal />
      <CoursesSection title={t`Магазин курсов`}>
        {data.map((course) => (
          <CourseCard key={course.id} {...course} variant='shop' />
        ))}
      </CoursesSection>
      {data.length === 0 && (
        <Placeholder
          className='mt-10'
          icon={<PiMagnifyingGlass className='size-10 opacity-50' />}
          text={t`Здесь пока ничего нет`}
          description={t`Загляните позже`}
        >
          <LinkButton to='/' size='sm'>
            <Trans>Продолжить обучение</Trans>
          </LinkButton>
        </Placeholder>
      )}
    </Container>
  );
}
