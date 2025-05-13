import { ApiComponents } from '~/shared/api';

export enum CourseCollectionStatus {
  IN_PROGRESS = 'inProgress',
  NOT_STARTED = 'notStarted',
  COMPLETED = 'completed',
}

interface SortCollectionCoursesProps {
  [CourseCollectionStatus.IN_PROGRESS]: ApiComponents['MyCourse'][];
  [CourseCollectionStatus.NOT_STARTED]: ApiComponents['MyCourse'][];
  [CourseCollectionStatus.COMPLETED]: ApiComponents['MyCourse'][];
}

export function sortCollectionCourses(courses: ApiComponents['MyCourse'][]): SortCollectionCoursesProps {
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
