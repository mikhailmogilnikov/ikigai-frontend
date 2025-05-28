import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { AdminUsersQuery } from '~/domains/admin/entities/user';
import { AdminUsersTable } from '~/domains/admin/widgets/users-table';
import { PageLoader } from '~/shared/ui/common/page-loader';

export const Route = createFileRoute('/admin/_guard/users')({
  component: RouteComponent,
  loader: ({ context: { queryClient } }) => queryClient.ensureQueryData(AdminUsersQuery),
  pendingComponent: () => <PageLoader type='layout' />,
});

function RouteComponent() {
  const {
    data: { data: users },
  } = useSuspenseQuery(AdminUsersQuery);

  if (!users) return;

  return (
    <div className='-m-4'>
      <AdminUsersTable users={users} />
    </div>
  );
}
