import { queryOptions } from '@tanstack/react-query';

import { fetchClient } from '~/shared/api';

export const AdminUsersQuery = queryOptions({
  queryKey: ['admin', 'users', 'list'],
  queryFn: () => fetchClient.GET('/admin/users'),
});
