import { useLingui } from '@lingui/react/macro';
import { createFileRoute } from '@tanstack/react-router';
import { msg } from '@lingui/core/macro';
import { useSuspenseQuery } from '@tanstack/react-query';

import { CourseCard, CourseCollectionStatus, sortCollectionCourses } from '~/domains/education/entities/course';
import { CoursesSection } from '~/domains/education/widgets/course-section';
import { PageLoader } from '~/shared/ui/common/page-loader';
import { Container } from '~/shared/ui/primitives/container';
import { myCoursesQuery } from '~/domains/education/entities/course/api';

export const Route = createFileRoute('/(education)/_guard/')({
  component: RouteComponent,
  pendingComponent: () => <PageLoader type='layout' />,
  loader: ({ context: { queryClient } }) => queryClient.ensureQueryData(myCoursesQuery),
});

function RouteComponent() {
  const { i18n } = useLingui();
  const { data: courses } = useSuspenseQuery(myCoursesQuery);

  const sortedCourses = sortCollectionCourses(courses.data ?? []);

  return (
    <Container gap='2xl'>
      {SECTIONS.map(({ id, title }) => {
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
    </Container>
  );
}

const SECTIONS = [
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
];
