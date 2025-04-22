import { createFileRoute } from '@tanstack/react-router';

import { Container } from '~/shared/ui/primitives/container';

export const Route = createFileRoute('/(education)/_guard/profile')({
  component: RouteComponent,
});

function RouteComponent() {
  return <Container>Hello "/(education)/_guard/profile"!</Container>;
}
