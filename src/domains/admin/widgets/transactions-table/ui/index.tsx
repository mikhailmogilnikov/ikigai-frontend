import { DataTable } from '~/shared/ui/common/data-table/data-table';
import { ApiComponents } from '~/shared/api';
import { useSearch } from '~/domains/admin/features/search';

import { TRANSACTION_TABLE_COLUMNS } from '../config/columns';

interface AdminTransactionsTableProps {
  transactions: ApiComponents['AdminTransaction'][];
}

export function AdminTransactionsTable({ transactions }: AdminTransactionsTableProps) {
  const { search } = useSearch();

  return <DataTable searchValue={search} columns={TRANSACTION_TABLE_COLUMNS} data={transactions} />;
}
