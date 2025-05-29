import { HttpResponse } from 'msw';

import { http } from '../../http';
import { generateAdminMockCourseFull, generateMockCourse, MOCK_ADMIN_COURSES } from '../../data/admin-courses';

export const admin_courses_handlers = [
  http.get('/admin/courses', () => {
    return HttpResponse.json(MOCK_ADMIN_COURSES);
  }),
  http.post('/admin/courses', async ({ request }) => {
    const body = await request.json();

    const newCourse = generateMockCourse(body.title);

    MOCK_ADMIN_COURSES.unshift(newCourse);

    return HttpResponse.json(undefined, { status: 201 });
  }),
  http.get('/admin/courses/{courseId}', ({ params: { courseId } }) => {
    const course = generateAdminMockCourseFull(Number(courseId));

    return HttpResponse.json(course);
  }),
];
