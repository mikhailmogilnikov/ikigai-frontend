import { faker } from '@faker-js/faker';

import { ApiComponents } from '../..';

export const generateMockCourse = (title: string | undefined = undefined): ApiComponents['AdminCourse'] => {
  return {
    id: Math.floor(Math.random() * 100000),
    title: title ?? faker.lorem.sentence(),
    price: faker.number.int({ min: 100, max: 1000 }),
    image_url: faker.image.url(),
    lessons_amount: faker.number.int({ min: 10, max: 100 }),
    created_at: title ? faker.date.recent().toISOString() : faker.date.past().toISOString(),
    updated_at: title ? faker.date.recent().toISOString() : faker.date.past().toISOString(),
    published: title ? false : faker.datatype.boolean(),
    modules_amount: faker.number.int({ min: 1, max: 10 }),
    users_amount: faker.number.int({ min: 10, max: 1000 }),
    finished_users_amount: faker.number.int({ min: 0, max: 1000 }),
  };
};

export const generateAdminMockCourseInfo = (id: number): ApiComponents['AdminCourseMainInfo'] => {
  return {
    id,
    title: faker.lorem.sentence(),
    image_url: faker.image.url(),
    lessons_amount: faker.number.int({ min: 10, max: 100 }),
    created_at: faker.date.recent().toISOString(),
    updated_at: faker.date.recent().toISOString(),
    published: faker.datatype.boolean(),
    description: faker.lorem.paragraph(),
    price: faker.number.int({ min: 100, max: 1000 }),
    users_amount: faker.number.int({ min: 10, max: 1000 }),
    finished_users_amount: faker.number.int({ min: 0, max: 1000 }),
  };
};

export const MOCK_ADMIN_COURSES: ApiComponents['AdminCourse'][] = Array.from({ length: 40 }, () =>
  generateMockCourse(),
);

export const MOCK_ADMIN_COURSES_INFO: ApiComponents['AdminCourseMainInfo'][] = MOCK_ADMIN_COURSES.map((course) =>
  generateAdminMockCourseInfo(course.id),
);
