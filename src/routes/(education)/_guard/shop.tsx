import { useLingui } from '@lingui/react/macro';
import { createFileRoute } from '@tanstack/react-router';

import { CourseCard, CourseShop } from '~/domains/education/entities/course';
import { CoursesSection } from '~/domains/education/widgets/course-section';
import { Container } from '~/shared/ui/primitives/container';

export const Route = createFileRoute('/(education)/_guard/shop')({
  component: RouteComponent,
});

function RouteComponent() {
  const { t } = useLingui();

  return (
    <Container>
      <CoursesSection title={t`Магазин`}>
        {MOCK_COURSES.map((course) => (
          <CourseCard key={course.id} {...course} variant='shop' />
        ))}
      </CoursesSection>
    </Container>
  );
}

const MOCK_COURSES: CourseShop[] = [
  {
    id: '1',
    title: 'Курс 1',
    imageUrl: 'https://fakeimg.pl/600x400/292929/909090?font=bebas',
    price: 10000,
    lessonsCount: 10,
    modulesCount: 1,
  },
  {
    id: '2',
    title: 'Курс 2',
    imageUrl: 'https://fakeimg.pl/600x400/292929/909090?font=bebas',
    price: 12442,
    lessonsCount: 10,
    modulesCount: 1,
  },
  {
    id: '3',
    title: 'Курс 3',
    imageUrl: 'https://fakeimg.pl/600x400/292929/909090?font=bebas',
    price: 400,
    lessonsCount: 10,
    modulesCount: 5,
  },
  {
    id: '4',
    title: 'Курс 4',
    imageUrl: 'https://fakeimg.pl/600x400/292929/909090?font=bebas',
    price: 100000,
    lessonsCount: 1,
    modulesCount: 2,
  },
];
