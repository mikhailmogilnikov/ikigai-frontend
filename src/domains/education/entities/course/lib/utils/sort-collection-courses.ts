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
      if (course.completedLessonsCount === course.lessonsCount) {
        acc.completed.push(course);
      } else if (course.completedLessonsCount > 0) {
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
