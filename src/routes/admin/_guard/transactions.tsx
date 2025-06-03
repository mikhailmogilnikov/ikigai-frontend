import { createFileRoute } from '@tanstack/react-router';

import { AdminTransactionsTable } from '~/domains/admin/widgets/transactions-table';
import { rqClient } from '~/shared/api';

export const Route = createFileRoute('/admin/_guard/transactions')({
  component: RouteComponent,
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(rqClient.queryOptions('get', '/admin/transactions')),
});

function RouteComponent() {
  const { data } = rqClient.useSuspenseQuery('get', '/admin/transactions');

  return (
    <div className='-m-4'>
      <AdminTransactionsTable transactions={data} />
    </div>
  );
}
