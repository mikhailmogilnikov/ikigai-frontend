import { DataTable } from '~/shared/ui/common/data-table/data-table';
import { ApiComponents } from '~/shared/api';
import { useSearch } from '~/domains/admin/features/search';

interface AdminTransactionsTableProps {
  transactions: ApiComponents['Transaction'][];
}

export function AdminTransactionsTable({ transactions }: AdminTransactionsTableProps) {
  const { search } = useSearch();

  return <DataTable searchValue={search} columns={[]} data={transactions} />;
}
