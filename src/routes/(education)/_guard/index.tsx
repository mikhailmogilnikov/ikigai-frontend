import { useLingui } from '@lingui/react/macro';
import { createFileRoute } from '@tanstack/react-router';
import { msg } from '@lingui/core/macro';

import {
  CourseCard,
  CourseCollection,
  CourseCollectionStatus,
  sortCollectionCourses,
} from '~/domains/education/entities/course';
import { CoursesSection } from '~/domains/education/widgets/course-section';
import { PageLoader } from '~/shared/ui/common/page-loader';
import { Container } from '~/shared/ui/primitives/container';

export const Route = createFileRoute('/(education)/_guard/')({
  component: RouteComponent,
  pendingComponent: () => <PageLoader type='layout' />,
});

function RouteComponent() {
  const { i18n } = useLingui();

  const sortedCourses = sortCollectionCourses(MOCK_COURSES);

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

const MOCK_COURSES: CourseCollection[] = [
  {
    id: '1',
    title: 'Курс 1',
    imageUrl: 'https://fakeimg.pl/600x400/292929/909090?font=bebas',
    lessonsCount: 10,
    completedLessonsCount: 0,
    currentLessonId: '1',
  },
  {
    id: '2',
    title: 'Курс 2',
    imageUrl: 'https://fakeimg.pl/600x400/292929/909090?font=bebas',
    lessonsCount: 10,
    completedLessonsCount: 5,
    currentLessonId: '6',
  },
  {
    id: '3',
    title: 'Курс 3',
    imageUrl: 'https://fakeimg.pl/600x400/292929/909090?font=bebas',
    lessonsCount: 10,
    completedLessonsCount: 10,
    currentLessonId: '1',
  },
  {
    id: '4',
    title: 'Курс 4',
    imageUrl: 'https://fakeimg.pl/600x400/292929/909090?font=bebas',
    lessonsCount: 10,
    completedLessonsCount: 10,
    currentLessonId: '1',
  },
  {
    id: '5',
    title: 'Курс 5',
    imageUrl: 'https://fakeimg.pl/600x400/292929/909090?font=bebas',
    lessonsCount: 54,
    completedLessonsCount: 2,
    currentLessonId: '1',
  },
];
