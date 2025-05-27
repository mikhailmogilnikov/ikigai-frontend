import { queryOptions } from '@tanstack/react-query';

import { fetchClient } from '~/shared/api';

export const adminCoursesQuery = queryOptions({
  queryKey: ['admin', 'courses', 'list'],
  queryFn: () => fetchClient.GET('/admin/courses'),
});
