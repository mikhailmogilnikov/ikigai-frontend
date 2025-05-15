import { useLingui } from '@lingui/react/macro';
import { createFileRoute } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';

import { Container } from '~/shared/ui/primitives/container';
import { TransactionsTable } from '~/domains/education/widgets/transactions-table';
import { PageLoader } from '~/shared/ui/common/page-loader';
import { transactionsQuery } from '~/domains/education/entities/transaction';
export const Route = createFileRoute('/(education)/_guard/transactions')({
  component: RouteComponent,
  loader: ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData(transactionsQuery);
  },
  pendingComponent: () => <PageLoader type='layout' />,
});

function RouteComponent() {
  const { t } = useLingui();
  const { data: transactions } = useSuspenseQuery(transactionsQuery);

  if (!transactions.data) {
    return null;
  }

  return (
    <Container size='md' title={t`История транзакций`}>
      <TransactionsTable transactions={transactions.data} />
    </Container>
  );
}
