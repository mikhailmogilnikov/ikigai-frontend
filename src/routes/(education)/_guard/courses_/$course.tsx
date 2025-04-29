import { createFileRoute } from '@tanstack/react-router';
import { Trans } from '@lingui/react/macro';

import { Container } from '~/shared/ui/primitives/container';

export const Route = createFileRoute('/(education)/_guard/courses_/$course')({
  component: RouteComponent,
});

function RouteComponent() {
  const { course } = Route.useParams();

  return (
    <Container>
      <Trans>Hello course {course}</Trans>
    </Container>
  );
}
