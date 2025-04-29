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

/* eslint-disable lingui/no-unlocalized-strings */
const MOCK_COURSES: CourseShop[] = [
  {
    id: '1',
    title: 'Курс 1',
    image_url: 'https://fakeimg.pl/600x400/292929/909090?font=bebas',
    price: 10000,
    lessons_amount: 10,
    modules_amount: 1,
  },
  {
    id: '2',
    title: 'Курс 2',
    image_url: 'https://fakeimg.pl/600x400/292929/909090?font=bebas',
    price: 12442,
    lessons_amount: 10,
    modules_amount: 1,
  },
  {
    id: '3',
    title: 'Курс 3',
    image_url: 'https://fakeimg.pl/600x400/292929/909090?font=bebas',
    price: 400,
    lessons_amount: 10,
    modules_amount: 5,
  },
  {
    id: '4',
    title: 'Курс 4',
    image_url: 'https://fakeimg.pl/600x400/292929/909090?font=bebas',
    price: 100000,
    lessons_amount: 1,
    modules_amount: 2,
  },
];
