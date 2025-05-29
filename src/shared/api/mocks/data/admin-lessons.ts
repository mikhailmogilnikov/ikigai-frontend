import { faker } from '@faker-js/faker';

import { ApiComponents } from '../..';

export const generateAdminMockLesson = (): ApiComponents['AdminLesson'] => {
  return {
    id: faker.number.int({ min: 1, max: 1000 }),
    title: faker.lorem.sentence(),
    order: faker.number.int({ min: 1, max: 100 }),
    is_published: faker.datatype.boolean(),
  };
};
