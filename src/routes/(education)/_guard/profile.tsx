import { useLingui } from '@lingui/react/macro';
import { createFileRoute } from '@tanstack/react-router';

import { PageLoader } from '~/shared/ui/common/page-loader';
import { Container } from '~/shared/ui/primitives/container';

export const Route = createFileRoute('/(education)/_guard/profile')({
  component: RouteComponent,
  pendingComponent: () => <PageLoader type='layout' />,
});

function RouteComponent() {
  const { t } = useLingui();

  return <Container title={t`Профиль`}></Container>;
}
