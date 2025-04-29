import { useLingui } from '@lingui/react/macro';
import { createFileRoute } from '@tanstack/react-router';

import { Container } from '~/shared/ui/primitives/container';
import { TransactionsTable } from '~/domains/education/widgets/transactions-table';
import { PageLoader } from '~/shared/ui/common/page-loader';

export const Route = createFileRoute('/(education)/_guard/transactions')({
  component: RouteComponent,
  loader: async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  },
  pendingComponent: () => <PageLoader type='layout' />,
});

function RouteComponent() {
  const { t } = useLingui();

  return (
    <Container title={t`История транзакций`}>
      <TransactionsTable />
    </Container>
  );
}
