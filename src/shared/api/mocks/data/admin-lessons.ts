import { faker } from '@faker-js/faker';

import { ApiComponents } from '../..';

import { MOCK_ADMIN_MODULES } from './admin-modules';

export const generateAdminMockLesson = (
  moduleId: number,
  courseId: number,
  order: number | undefined = undefined,
): ApiComponents['AdminLesson'] => {
  return {
    id: faker.number.int({ min: 1, max: 10000 }),
    title: faker.lorem.sentence(),
    order: order ?? faker.number.int({ min: 1, max: 100 }),
    module_id: moduleId,
    course_id: courseId,
    is_published: faker.datatype.boolean(),
    video_url: faker.datatype.boolean() ? faker.internet.url() : null,
    poster_url: faker.datatype.boolean() ? faker.image.url() : null,
    content: faker.lorem.paragraphs(3),
    tests: Array.from({ length: faker.number.int({ min: 0, max: 3 }) }, (_, index) => ({
      id: faker.number.int({ min: 1, max: 1000 }),
      lesson_id: faker.number.int({ min: 1, max: 1000 }),
      title: faker.lorem.sentence(),
      order: index + 1,
      variants: Array.from({ length: faker.number.int({ min: 2, max: 4 }) }, (_, variantIndex) => ({
        id: faker.number.int({ min: 1, max: 1000 }),
        title: faker.lorem.sentence(),
        is_correct: variantIndex === 0, // Первый вариант правильный
        description: faker.datatype.boolean() ? faker.lorem.sentence() : null,
        order: variantIndex + 1,
      })),
    })),
    is_completed: faker.datatype.boolean(),
  };
};

export const MOCK_ADMIN_LESSONS: ApiComponents['AdminLesson'][] = MOCK_ADMIN_MODULES.flatMap((module) =>
  Array.from({ length: faker.number.int({ min: 3, max: 8 }) }, (_, index) =>
    generateAdminMockLesson(module.id, module.course_id, index + 1),
  ),
);
