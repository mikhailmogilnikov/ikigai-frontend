import { Trans, useLingui } from '@lingui/react/macro';
import { createFileRoute } from '@tanstack/react-router';
import { msg } from '@lingui/core/macro';
import { PiMagnifyingGlass } from 'react-icons/pi';

import { CourseCard, CourseCollectionStatus, sortCollectionCourses } from '~/domains/education/entities/course';
import { CoursesSection } from '~/domains/education/widgets/course-section';
import { Container } from '~/shared/ui/primitives/container';
import { rqClient } from '~/shared/api';
import { Placeholder } from '~/shared/ui/common/placeholder';
import { LinkButton } from '~/shared/ui/primitives/link-button';

export const Route = createFileRoute('/(education)/_guard/')({
  component: RouteComponent,
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(rqClient.queryOptions('get', '/courses/my-courses')),
});

const COURSE_SECTIONS = [
  {
    id: CourseCollectionStatus.IN_PROGRESS,
    title: msg`В процессе изучения`,
  },
  {
    id: CourseCollectionStatus.NOT_STARTED,
    title: msg`Не начатые`,
  },
  {
    id: CourseCollectionStatus.COMPLETED,
    title: msg`Завершенные`,
  },
] as const;

function RouteComponent() {
  const { i18n, t } = useLingui();
  const { data } = rqClient.useSuspenseQuery('get', '/courses/my-courses');

  const sortedCourses = sortCollectionCourses(data);

  return (
    <Container gap='2xl'>
      {COURSE_SECTIONS.map(({ id, title }) => {
        const courses = sortedCourses[id];

        if (courses.length === 0) return null;

        return (
          <CoursesSection key={id} title={i18n._(title)}>
            {courses.map((course) => (
              <CourseCard key={course.id} {...course} variant='collection' />
            ))}
          </CoursesSection>
        );
      })}
      {data.length === 0 && (
        <Placeholder
          className='mt-10'
          icon={<PiMagnifyingGlass className='size-10 opacity-50' />}
          text={t`Здесь пока ничего нет`}
          description={t`Купите первый курс`}
        >
          <LinkButton to='/shop' size='sm' color='primary'>
            <Trans>В магазин</Trans>
          </LinkButton>
        </Placeholder>
      )}
    </Container>
  );
}
