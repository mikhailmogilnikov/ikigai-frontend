import { HttpResponse } from 'msw';

import { http } from '../../http';
import { generateMockCourse, MOCK_ADMIN_COURSES, MOCK_ADMIN_COURSES_INFO } from '../../data/admin-courses';
import { generateAdminMockModule, MOCK_ADMIN_MODULES } from '../../data/admin-modules';

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
    const course = MOCK_ADMIN_COURSES_INFO.find((course) => course.id === Number(courseId));

    if (!course) {
      return HttpResponse.json({ message: 'Course not found', code: 404 }, { status: 404 });
    }

    return HttpResponse.json(course);
  }),
  http.patch('/admin/courses/{courseId}', async ({ params: { courseId }, request }) => {
    const courseIndex = MOCK_ADMIN_COURSES_INFO.findIndex((course) => course.id === Number(courseId));

    if (courseIndex === -1) {
      return HttpResponse.json({ message: 'Course not found', code: 404 }, { status: 404 });
    }

    const updateData = await request.json();

    // Обновляем только существующие поля курса
    Object.assign(MOCK_ADMIN_COURSES_INFO[courseIndex], updateData);

    return HttpResponse.json(null, { status: 201 });
  }),
  http.get('/admin/courses/{courseId}/modules', ({ params: { courseId } }) => {
    const modules = MOCK_ADMIN_MODULES.filter((module) => module.course_id === Number(courseId));

    if (!modules.length) {
      return HttpResponse.json({ message: 'Modules not found', code: 404 }, { status: 404 });
    }

    return HttpResponse.json(modules);
  }),
  http.post('/admin/courses/{courseId}/modules', ({ params: { courseId } }) => {
    const newModule = generateAdminMockModule(Number(courseId));

    MOCK_ADMIN_MODULES.unshift(newModule);

    return HttpResponse.json(undefined, { status: 201 });
  }),
  http.put('/admin/courses/{courseId}/modules/reorder', () => {
    return HttpResponse.json(null, { status: 201 });
  }),
  http.delete('/admin/courses/{courseId}', ({ params }) => {
    console.log(`Mock: Deleting course with id ${params.courseId}`);

    return HttpResponse.json(null, { status: 201 });
  }),
];
