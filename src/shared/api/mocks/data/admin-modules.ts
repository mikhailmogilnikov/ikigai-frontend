import { faker } from '@faker-js/faker';

import { ApiComponents } from '../..';

import { MOCK_ADMIN_COURSES_INFO } from './admin-courses';

export const generateAdminMockModule = (
  courseId: number,
  order: number | undefined = undefined,
): ApiComponents['AdminModule'] => {
  return {
    id: faker.number.int({ min: 1, max: 1000 }),
    title: faker.lorem.sentence(),
    course_id: courseId,
    order: order ?? faker.number.int({ min: 1, max: 100 }),
    published: faker.datatype.boolean(),
    lessons_amount: faker.number.int({ min: 1, max: 10 }),
  };
};

export const MOCK_ADMIN_MODULES: ApiComponents['AdminModule'][] = MOCK_ADMIN_COURSES_INFO.flatMap((course) =>
  Array.from({ length: faker.number.int({ min: 1, max: 10 }) }, (_, index) =>
    generateAdminMockModule(course.id, index),
  ),
);
