import { useLingui } from '@lingui/react/macro';
import { createFileRoute } from '@tanstack/react-router';
import { msg } from '@lingui/core/macro';

import { CourseCard, CourseCollectionStatus, sortCollectionCourses } from '~/domains/education/entities/course';
import { CoursesSection } from '~/domains/education/widgets/course-section';
import { PageLoader } from '~/shared/ui/common/page-loader';
import { Container } from '~/shared/ui/primitives/container';
import { fetchClient } from '~/shared/api';

export const Route = createFileRoute('/(education)/_guard/')({
  component: RouteComponent,
  pendingComponent: () => <PageLoader type='layout' />,
  loader: async () => {
    const data = await fetchClient.GET('/courses/my-courses');

    return {
      courses: data.data,
    };
  },
});

function RouteComponent() {
  const { i18n } = useLingui();
  const { courses } = Route.useLoaderData();

  const sortedCourses = sortCollectionCourses(courses ?? []);

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
