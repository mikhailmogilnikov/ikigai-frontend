import { createFileRoute } from '@tanstack/react-router';

import { AdminUsersTable } from '~/domains/admin/widgets/users-table';
import { rqClient } from '~/shared/api';

export const Route = createFileRoute('/admin/_guard/users')({
  component: RouteComponent,
  loader: ({ context: { queryClient } }) => queryClient.ensureQueryData(rqClient.queryOptions('get', '/admin/users')),
});

function RouteComponent() {
  const { data } = rqClient.useSuspenseQuery('get', '/admin/users');

  return (
    <div className='-m-4'>
      <AdminUsersTable users={data} />
    </div>
  );
}
