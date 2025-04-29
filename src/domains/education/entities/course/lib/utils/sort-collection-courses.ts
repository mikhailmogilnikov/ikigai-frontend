import { CourseCollection } from '../../model/course.type';

export enum CourseCollectionStatus {
  IN_PROGRESS = 'inProgress',
  NOT_STARTED = 'notStarted',
  COMPLETED = 'completed',
}

interface SortCollectionCoursesProps {
  [CourseCollectionStatus.IN_PROGRESS]: CourseCollection[];
  [CourseCollectionStatus.NOT_STARTED]: CourseCollection[];
  [CourseCollectionStatus.COMPLETED]: CourseCollection[];
}

export function sortCollectionCourses(courses: CourseCollection[]): SortCollectionCoursesProps {
  const sortedCourses = courses.reduce<SortCollectionCoursesProps>(
    (acc, course) => {
      if (course.completed_lessons_amount === course.lessons_amount) {
        acc.completed.push(course);
      } else if (course.completed_lessons_amount > 0) {
        acc.inProgress.push(course);
      } else {
        acc.notStarted.push(course);
      }

      return acc;
    },
    {
      [CourseCollectionStatus.IN_PROGRESS]: [],
      [CourseCollectionStatus.NOT_STARTED]: [],
      [CourseCollectionStatus.COMPLETED]: [],
    },
  );

  return sortedCourses;
}
