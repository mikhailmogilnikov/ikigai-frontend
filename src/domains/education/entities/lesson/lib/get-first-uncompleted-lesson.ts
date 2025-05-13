import { ApiComponents } from '~/shared/api';

export const getFirstUncompletedLesson = (modules: ApiComponents['ModuleWithLessons'][]) => {
  const sortedModules = [...modules].sort((a, b) => a.order - b.order);

  for (const module of sortedModules) {
    const sortedLessons = [...module.lessons].sort((a, b) => a.order - b.order);

    const uncompletedLesson = sortedLessons.find((lesson) => !lesson.is_completed);

    if (uncompletedLesson) {
      return uncompletedLesson;
    }
  }

  return sortedModules[0].lessons[0];
};
