import { ApiComponents } from '~/shared/api';

import { getFirstUncompletedLesson } from './get-first-uncompleted-lesson';

export const getNextUncompletedLesson = (modules: ApiComponents['ModuleWithLessons'][], lessonId: string) => {
  const sortedModules = [...modules].sort((a, b) => a.order - b.order);

  // Найти модуль и индекс текущего урока
  let currentModuleIndex = -1;
  let currentLessonIndex = -1;

  for (let i = 0; i < sortedModules.length; i++) {
    const module = sortedModules[i];
    const sortedLessons = [...module.lessons].sort((a, b) => a.order - b.order);

    const lessonIndex = sortedLessons.findIndex((lesson) => lesson.id === lessonId);

    if (lessonIndex !== -1) {
      currentModuleIndex = i;
      currentLessonIndex = lessonIndex;
      break;
    }
  }

  // Если текущий урок не найден, вернуть первый незавершенный
  if (currentModuleIndex === -1) {
    return getFirstUncompletedLesson(modules);
  }

  // Поиск следующего незавершенного урока в текущем модуле
  const currentModule = sortedModules[currentModuleIndex];
  const sortedCurrentLessons = [...currentModule.lessons].sort((a, b) => a.order - b.order);

  // Проверяем уроки в текущем модуле, начиная со следующего после текущего
  for (let i = currentLessonIndex + 1; i < sortedCurrentLessons.length; i++) {
    if (!sortedCurrentLessons[i].is_completed) {
      return sortedCurrentLessons[i];
    }
  }

  // Если в текущем модуле не найдено незавершенных уроков, ищем в следующих модулях
  for (let i = currentModuleIndex + 1; i < sortedModules.length; i++) {
    const nextModule = sortedModules[i];
    const sortedNextLessons = [...nextModule.lessons].sort((a, b) => a.order - b.order);

    const uncompletedLesson = sortedNextLessons.find((lesson) => !lesson.is_completed);

    if (uncompletedLesson) {
      return uncompletedLesson;
    }
  }

  // Проверяем, является ли текущий урок последним в курсе
  const isLastLesson =
    currentModuleIndex === sortedModules.length - 1 && currentLessonIndex === sortedCurrentLessons.length - 1;

  // Если это последний урок и все уроки пройдены, возвращаем ENDED
  if (isLastLesson) {
    return 'ENDED';
  }

  // Если текущий урок последний в модуле, возвращаем первый урок следующего модуля
  if (currentLessonIndex === sortedCurrentLessons.length - 1) {
    return sortedModules[currentModuleIndex + 1].lessons[0];
  }

  // Иначе возвращаем следующий урок в текущем модуле
  return sortedCurrentLessons[currentLessonIndex + 1];
};
