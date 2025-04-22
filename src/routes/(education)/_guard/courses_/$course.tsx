import { createFileRoute } from '@tanstack/react-router';

import { Container } from '~/shared/ui/primitives/container';

export const Route = createFileRoute('/(education)/_guard/courses_/$course')({
  component: RouteComponent,
});

function RouteComponent() {
  const { course } = Route.useParams();

  return <Container>Hello course {course}</Container>;
}
