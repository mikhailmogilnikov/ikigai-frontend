import { HttpResponse } from 'msw';

import { http } from '../../http';
import { MOCK_ADMIN_COURSES } from '../../data/admin-courses';

export const admin_courses_handlers = [
  http.get('/admin/courses', () => {
    return HttpResponse.json(MOCK_ADMIN_COURSES);
  }),
];
