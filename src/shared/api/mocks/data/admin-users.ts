import { faker } from '@faker-js/faker';

import { ApiComponents } from '../..';

const generateMockUser = (): ApiComponents['AdminUser'] => {
  return {
    id: Math.floor(Math.random() * 10000),
    email: faker.internet.email(),
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    role: faker.helpers.arrayElement(['admin', 'student']),
    image_url: faker.image.url(),
    join_date: faker.date.past().toISOString(),
    course_amount: faker.number.int({ min: 0, max: 10 }),
  };
};

export const MOCK_ADMIN_USERS: ApiComponents['AdminUser'][] = Array.from({ length: 40 }, () => generateMockUser());
