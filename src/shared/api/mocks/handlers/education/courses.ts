import { HttpResponse } from 'msw';

import {
  MOCK_COURSE_FULL,
  MOCK_COURSE_LESSONS,
  MOCK_COURSES_MY_LIST,
  MOCK_COURSES_SHOP_LIST,
  MOCK_LESSON_FULL,
} from '../../data/courses';
import { http } from '../../http';

export const edu_courses_handlers = [
  http.get('/courses/store', () => {
    return HttpResponse.json(MOCK_COURSES_SHOP_LIST);
  }),
  http.get('/courses/my-courses', () => {
    return HttpResponse.json(MOCK_COURSES_MY_LIST);
  }),
  http.get('/courses/{courseId}', () => {
    return HttpResponse.json(MOCK_COURSE_FULL);
  }),
  http.get('/courses/{courseId}/lessons', () => {
    return HttpResponse.json(MOCK_COURSE_LESSONS);
  }),
  http.get('/lessons/{lessonId}', () => {
    return HttpResponse.json(MOCK_LESSON_FULL);
  }),
];
