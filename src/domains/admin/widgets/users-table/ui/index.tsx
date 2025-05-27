import { DataTable } from '~/shared/ui/common/data-table/data-table';
import { ApiComponents } from '~/shared/api';
import { useSearch } from '~/domains/admin/features/search';

interface AdminUsersTableProps {
  users: ApiComponents['User'][];
}

export function AdminUsersTable({ users }: AdminUsersTableProps) {
  const { search } = useSearch();

  return <DataTable searchValue={search} columns={[]} data={users} />;
}
