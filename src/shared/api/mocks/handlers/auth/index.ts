import { HttpResponse } from 'msw';
import { faker } from '@faker-js/faker';

import { http } from '../../http';

export const authHandlers = [
  http.post('/auth/login', async ({ request }) => {
    const body = await request.json();

    const studentToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImV4cCI6MTc0NTY1NDkyMiwicm9sZSI6InN0dWRlbnQifQ.IA0up6uQFlGNWG-zo7iKHh0DTLEjyI5DMMO8JvWgNfY';
    const adminToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImV4cCI6MTc0NTY1NDkyMiwicm9sZSI6ImFkbWluIn0.QGfAjdzEzjAoozLSePfPawuWJkRanWSlzggnn796Cpw';

    if (body.email === 'ds@ds.ds') {
      return HttpResponse.json({ access_token: studentToken }, { status: 200 });
    }

    return HttpResponse.json({ access_token: adminToken }, { status: 200 });
  }),

  // POST /auth/register
  http.post('/auth/register', () => {
    // В реальном приложении здесь была бы логика валидации и сохранения пользователя
    // Для мока просто возвращаем успешный ответ
    return HttpResponse.json(null, { status: 200 });
  }),

  // POST /auth/register/confirm
  http.post('/auth/register/confirm', async ({ request }) => {
    const body = await request.json();

    if (body.code && body.code.length === 6) {
      // Пример простой проверки кода
      return HttpResponse.json(null, { status: 200 });
    }

    return HttpResponse.json(null, { status: 400 });
  }),

  // POST /auth/recover-password
  http.post('/auth/recover-password', async ({ request }) => {
    const body = await request.json();

    if (body.email && faker.internet.email() === body.email) {
      return HttpResponse.json(null, { status: 404 });
    }

    // В реальности здесь была бы отправка письма
    return HttpResponse.json(null, { status: 200 });
  }),

  // POST /auth/recover-password/confirm
  http.post('/auth/recover-password/confirm', async ({ request }) => {
    const body = await request.json();

    if (body.code && body.code.length === 6) {
      // Пример простой проверки кода
      return HttpResponse.json(null, { status: 200 }); // Или 204 No Content
    }

    return HttpResponse.json(null, { status: 400 });
  }),

  // POST /auth/logout
  http.post('/auth/logout', () => {
    // В реальном приложении здесь была бы инвалидация токена
    return HttpResponse.json(null, { status: 200 });
  }),

  // POST /auth/refresh
  http.post('/auth/refresh', () => {
    // В реальном приложении здесь была бы проверка refresh token и выдача нового access token
    const newAccessToken = `fake-access-token-${faker.string.uuid()}`;

    return HttpResponse.json({ access_token: newAccessToken }, { status: 200 });
  }),
];
