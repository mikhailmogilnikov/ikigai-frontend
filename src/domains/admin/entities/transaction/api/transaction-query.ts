import { queryOptions } from '@tanstack/react-query';

import { fetchClient } from '~/shared/api';

export const AdminTransactionsQuery = queryOptions({
  queryKey: ['admin', 'transactions', 'list'],
  queryFn: () => fetchClient.GET('/admin/transactions'),
});
