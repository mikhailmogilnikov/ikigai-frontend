import { HttpResponse } from 'msw';

import { http } from '../../http';
import { MOCK_ADMIN_USERS } from '../../data/admin-users';

export const admin_users_handlers = [
  http.get('/admin/users', () => {
    return HttpResponse.json(MOCK_ADMIN_USERS);
  }),
];
