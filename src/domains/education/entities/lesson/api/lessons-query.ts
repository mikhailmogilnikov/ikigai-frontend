import { queryOptions } from '@tanstack/react-query';

import { fetchClient } from '~/shared/api';

export const getLessonQuery = (lessonId: string) =>
  queryOptions({
    queryKey: ['lesson', lessonId],
    queryFn: () => fetchClient.GET('/lessons/{lessonId}', { params: { path: { lessonId } } }),
  });
