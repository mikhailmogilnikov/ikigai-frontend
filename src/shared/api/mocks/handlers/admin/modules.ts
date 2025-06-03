import { HttpResponse } from 'msw';

import { http } from '../../http';
import { MOCK_ADMIN_MODULES } from '../../data/admin-modules';
import { MOCK_ADMIN_LESSONS, generateAdminMockLesson } from '../../data/admin-lessons';

export const admin_modules_handlers = [
  // GET /admin/modules/{moduleId}
  http.get('/admin/modules/{moduleId}', ({ params: { moduleId } }) => {
    const module = MOCK_ADMIN_MODULES.find((module) => module.id === Number(moduleId));

    if (!module) {
      return HttpResponse.json({ message: 'Module not found', code: 404 }, { status: 404 });
    }

    return HttpResponse.json(module);
  }),

  // DELETE /admin/modules/{moduleId}
  http.delete('/admin/modules/{moduleId}', ({ params: { moduleId } }) => {
    const moduleIndex = MOCK_ADMIN_MODULES.findIndex((module) => module.id === Number(moduleId));

    if (moduleIndex === -1) {
      return HttpResponse.json({ message: 'Module not found', code: 404 }, { status: 404 });
    }

    MOCK_ADMIN_MODULES.splice(moduleIndex, 1);

    return HttpResponse.json(null, { status: 201 });
  }),

  // PATCH /admin/modules/{moduleId}
  http.patch('/admin/modules/{moduleId}', async ({ params: { moduleId }, request }) => {
    const moduleIndex = MOCK_ADMIN_MODULES.findIndex((module) => module.id === Number(moduleId));

    if (moduleIndex === -1) {
      return HttpResponse.json({ message: 'Module not found', code: 404 }, { status: 404 });
    }

    const updateData = await request.json();

    MOCK_ADMIN_MODULES[moduleIndex] = { ...MOCK_ADMIN_MODULES[moduleIndex], ...updateData };

    return HttpResponse.json(null, { status: 201 });
  }),

  // GET /admin/modules/{moduleId}/lessons
  http.get('/admin/modules/{moduleId}/lessons', ({ params: { moduleId } }) => {
    const lessons = MOCK_ADMIN_LESSONS.filter((lesson) => lesson.module_id === Number(moduleId));

    return HttpResponse.json(lessons);
  }),

  // POST /admin/modules/{moduleId}/lessons
  http.post('/admin/modules/{moduleId}/lessons', async ({ params: { moduleId }, request }) => {
    const body = await request.json();
    const module = MOCK_ADMIN_MODULES.find((module) => module.id === Number(moduleId));

    if (!module) {
      return HttpResponse.json({ message: 'Module not found', code: 404 }, { status: 404 });
    }

    const newLesson = generateAdminMockLesson(Number(moduleId), module.course_id);

    newLesson.title = body.title;

    MOCK_ADMIN_LESSONS.unshift(newLesson);

    return HttpResponse.json(null, { status: 201 });
  }),

  // PUT /admin/modules/{moduleId}/lessons/reorder
  http.put('/admin/modules/{moduleId}/lessons/reorder', async ({ request }) => {
    const reorderData = await request.json();

    // Обновляем порядок уроков
    if (reorderData && Array.isArray(reorderData)) {
      reorderData.forEach((item: { id: number; order: number }) => {
        const lessonIndex = MOCK_ADMIN_LESSONS.findIndex((lesson) => lesson.id === item.id);

        if (lessonIndex !== -1) {
          MOCK_ADMIN_LESSONS[lessonIndex].order = item.order;
        }
      });
    }

    return HttpResponse.json(null, { status: 201 });
  }),

  // GET /admin/lessons/{lessonId}
  http.get('/admin/lessons/{lessonId}', ({ params: { lessonId } }) => {
    const lesson = MOCK_ADMIN_LESSONS.find((lesson) => lesson.id === Number(lessonId));

    if (!lesson) {
      return HttpResponse.json({ message: 'Lesson not found', code: 404 }, { status: 404 });
    }

    return HttpResponse.json(lesson);
  }),

  // DELETE /admin/lessons/{lessonId}
  http.delete('/admin/lessons/{lessonId}', ({ params: { lessonId } }) => {
    const lessonIndex = MOCK_ADMIN_LESSONS.findIndex((lesson) => lesson.id === Number(lessonId));

    if (lessonIndex === -1) {
      return HttpResponse.json({ message: 'Lesson not found', code: 404 }, { status: 404 });
    }

    MOCK_ADMIN_LESSONS.splice(lessonIndex, 1);

    return HttpResponse.json(null, { status: 201 });
  }),

  // PATCH /admin/lessons/{lessonId}
  http.patch('/admin/lessons/{lessonId}', async ({ params: { lessonId }, request }) => {
    const lessonIndex = MOCK_ADMIN_LESSONS.findIndex((lesson) => lesson.id === Number(lessonId));

    if (lessonIndex === -1) {
      return HttpResponse.json({ message: 'Lesson not found', code: 404 }, { status: 404 });
    }

    const updateData = await request.json();

    MOCK_ADMIN_LESSONS[lessonIndex] = { ...MOCK_ADMIN_LESSONS[lessonIndex], ...updateData };

    return HttpResponse.json(null, { status: 201 });
  }),
];
