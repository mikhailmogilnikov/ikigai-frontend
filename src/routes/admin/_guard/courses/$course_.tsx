import { createFileRoute } from '@tanstack/react-router';

import { Container } from '~/shared/ui/primitives/container';

export const Route = createFileRoute('/admin/_guard/courses/$course_')({
  component: RouteComponent,
});

function RouteComponent() {
  return <Container>ds</Container>;
}
