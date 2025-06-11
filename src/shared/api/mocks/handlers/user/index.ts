import { HttpResponse } from 'msw';
import { faker } from '@faker-js/faker';

import { http } from '../../http';

// Модель UserFull из generated.ts:
// id: number;
// email: string;
// phone_number: string | null;
// name: string | null;
// surname: string | null;
// patronymic: string | null;
// created_at: string; // дата-время ISO
// role: 'student' | 'admin';

// Ожидаемая структура ответа для /users/me (основано на ошибке линтера)
const MOCK_USER_ME = {
  id: faker.number.int({ min: 1, max: 1000 }),
  email: faker.internet.email(),
  first_name: faker.person.firstName(),
  last_name: faker.person.lastName(),
  image_url: faker.image.avatarGitHub(), // faker.image.avatar() более общий, но этот тоже подойдет
  join_date: faker.date.past().toISOString(), // Используем past() для даты регистрации
  role: faker.helpers.arrayElement(['student', 'admin'] as const),
  // Дополнительные поля из ошибки линтера (статистика)
  completed_courses_amount: faker.number.int({ min: 0, max: 20 }),
  completed_lessons_amount: faker.number.int({ min: 0, max: 200 }),
  bought_courses_amount: faker.number.int({ min: 0, max: 5 }),
  // Поля phone_number и patronymic, похоже, не ожидаются здесь напрямую
  // или должны быть частью другого объекта, если нужны.
  // Пока что убираем их, чтобы соответствовать ошибке.
};

export const userHandlers = [
  http.get('/users/me', () => {
    // Убедимся, что наш мок соответствует более сложному типу, который ожидает HttpResponse
    // В данном случае, структура MOCK_USER_ME должна уже подходить под один из вариантов объединения.
    return HttpResponse.json(MOCK_USER_ME);
  }),
];
