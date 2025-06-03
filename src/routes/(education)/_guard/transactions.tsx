import { useLingui } from '@lingui/react/macro';
import { createFileRoute } from '@tanstack/react-router';

import { Container } from '~/shared/ui/primitives/container';
import { TransactionsTable } from '~/domains/education/widgets/transactions-table';
import { rqClient } from '~/shared/api';

export const Route = createFileRoute('/(education)/_guard/transactions')({
  component: RouteComponent,
  loader: ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData(rqClient.queryOptions('get', '/transactions'));
  },
});

function RouteComponent() {
  const { t } = useLingui();
  const { data } = rqClient.useSuspenseQuery('get', '/transactions');

  return (
    <Container size='md' title={t`История транзакций`}>
      <TransactionsTable transactions={data} />
    </Container>
  );
}
