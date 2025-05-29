import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { AdminTransactionsTable } from '~/domains/admin/widgets/transactions-table';
import { rqClient } from '~/shared/api';
import { PageLoader } from '~/shared/ui/common/page-loader';

export const Route = createFileRoute('/admin/_guard/transactions')({
  component: RouteComponent,
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(rqClient.queryOptions('get', '/admin/transactions')),
  pendingComponent: () => <PageLoader type='layout' />,
});

function RouteComponent() {
  const { data } = useSuspenseQuery(rqClient.queryOptions('get', '/admin/transactions'));

  return (
    <div className='-m-4'>
      <AdminTransactionsTable transactions={data} />
    </div>
  );
}
