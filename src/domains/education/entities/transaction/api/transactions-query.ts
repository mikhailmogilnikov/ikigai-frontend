import { queryOptions } from '@tanstack/react-query';

import { fetchClient } from '~/shared/api';

export const transactionsQuery = queryOptions({
  queryKey: ['transactions'],
  queryFn: () => fetchClient.GET('/transactions'),
});
