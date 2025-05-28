import { DataTable } from '~/shared/ui/common/data-table/data-table';
import { ApiComponents } from '~/shared/api';
import { useSearch } from '~/domains/admin/features/search';

import { USERS_TABLE_COLUMNS } from '../config/columns';

interface AdminUsersTableProps {
  users: ApiComponents['AdminUser'][];
}

export function AdminUsersTable({ users }: AdminUsersTableProps) {
  const { search } = useSearch();

  return <DataTable searchValue={search} columns={USERS_TABLE_COLUMNS} data={users} />;
}
