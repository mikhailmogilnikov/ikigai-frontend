import { faker } from '@faker-js/faker';

import { ApiComponents } from '../..';

import { generateAdminMockLesson } from './admin-lessons';

export const generateAdminMockModule = (): ApiComponents['AdminModule'] => {
  return {
    id: faker.number.int({ min: 1, max: 1000 }),
    title: faker.lorem.sentence(),
    order: faker.number.int({ min: 1, max: 100 }),
    is_published: faker.datatype.boolean(),
    lessons: Array.from({ length: faker.number.int({ min: 1, max: 10 }) }, () => generateAdminMockLesson()),
  };
};
