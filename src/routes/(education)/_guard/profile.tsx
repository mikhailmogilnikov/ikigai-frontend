import { useLingui } from '@lingui/react/macro';
import { createFileRoute } from '@tanstack/react-router';

import { Container } from '~/shared/ui/primitives/container';

export const Route = createFileRoute('/(education)/_guard/profile')({
  component: RouteComponent,
});

function RouteComponent() {
  const { t } = useLingui();

  return <Container title={t`Профиль`}></Container>;
}
