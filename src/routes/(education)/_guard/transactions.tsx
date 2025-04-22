import { createFileRoute } from '@tanstack/react-router';

import { Container } from '~/shared/ui/primitives/container';

export const Route = createFileRoute('/(education)/_guard/transactions')({
  component: RouteComponent,
});

function RouteComponent() {
  return <Container>Hello "/(education)/_guard/transactions"!</Container>;
}
