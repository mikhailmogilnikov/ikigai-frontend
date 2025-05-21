import { HttpResponse } from 'msw';

import {
  MOCK_COURSE_FULL,
  MOCK_COURSE_LESSONS,
  MOCK_COURSES_MY_LIST,
  MOCK_COURSES_SHOP_LIST,
  MOCK_LESSONS_FULL,
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
  http.get('/lessons/{lessonId}', ({ params: { lessonId } }) => {
    return HttpResponse.json(MOCK_LESSONS_FULL.find((lesson) => lesson.id === lessonId));
  }),
  http.post('/lessons/{lessonId}/complete', async ({ request }) => {
    const { lesson_id } = await request.json();

    const lesson = MOCK_COURSE_FULL.modules
      .flatMap((module) => module.lessons)
      .find((lesson) => lesson.id === lesson_id);

    if (!lesson) {
      return HttpResponse.json(null, { status: 404 });
    }

    lesson.is_completed = true;

    return HttpResponse.json(null);
  }),
];
