import { createFileRoute } from '@tanstack/react-router';

import { Container } from '~/shared/ui/primitives/container';

export const Route = createFileRoute('/admin/_guard/courses_/$course_/modules_/$module')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Container size='md' title='Модуль'>
      s
    </Container>
  );
}
