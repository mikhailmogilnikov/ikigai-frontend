import { queryOptions } from '@tanstack/react-query';

import { fetchClient } from '~/shared/api';

export const myCoursesQuery = queryOptions({
  queryKey: ['my-courses'],
  queryFn: () => fetchClient.GET('/courses/my-courses'),
});

export const shopCoursesQuery = queryOptions({
  queryKey: ['shop-courses'],
  queryFn: () => fetchClient.GET('/courses/store'),
});

export const getCourseQuery = (courseId: string) =>
  queryOptions({
    queryKey: ['course', courseId],
    queryFn: () => fetchClient.GET('/courses/{courseId}', { params: { path: { courseId } } }),
  });

export const getCourseLessonsQuery = (courseId: string) =>
  queryOptions({
    queryKey: ['course-lessons', courseId],
    queryFn: () => fetchClient.GET('/courses/{courseId}/lessons', { params: { path: { courseId } } }),
  });
