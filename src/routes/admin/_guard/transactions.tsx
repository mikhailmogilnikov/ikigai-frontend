import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { AdminTransactionsQuery } from '~/domains/admin/entities/transaction/api/transaction-query';
import { AdminTransactionsTable } from '~/domains/admin/widgets/transactions-table';
import { PageLoader } from '~/shared/ui/common/page-loader';

export const Route = createFileRoute('/admin/_guard/transactions')({
  component: RouteComponent,
  loader: ({ context: { queryClient } }) => queryClient.ensureQueryData(AdminTransactionsQuery),
  pendingComponent: () => <PageLoader type='layout' />,
});

function RouteComponent() {
  const {
    data: { data: transactions },
  } = useSuspenseQuery(AdminTransactionsQuery);

  if (!transactions) return;

  return (
    <div className='-m-4'>
      <AdminTransactionsTable transactions={transactions} />
    </div>
  );
}
