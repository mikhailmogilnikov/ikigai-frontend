import { ApiComponents } from '~/shared/api';

export const getNextLesson = (modules: ApiComponents['ModuleWithLessons'][], lessonId: string) => {
  const sortedModules = [...modules].sort((a, b) => a.order - b.order);

  let currentModuleIndex = -1;
  let currentLessonIndex = -1;

  for (let i = 0; i < sortedModules.length; i++) {
    const module = sortedModules[i];
    const sortedLessons = [...module.lessons].sort((a, b) => a.order - b.order);

    const lessonIndex = sortedLessons.findIndex((lesson) => lesson.id === Number(lessonId));

    if (lessonIndex !== -1) {
      currentModuleIndex = i;
      currentLessonIndex = lessonIndex;
      break;
    }
  }

  // Если текущий урок не найден, возвращаем первый урок первого модуля
  if (currentModuleIndex === -1) {
    return sortedModules[0].lessons[0];
  }

  const currentModule = sortedModules[currentModuleIndex];
  const sortedCurrentLessons = [...currentModule.lessons].sort((a, b) => a.order - b.order);

  // Проверяем, является ли текущий урок последним в курсе
  const isLastLesson =
    currentModuleIndex === sortedModules.length - 1 && currentLessonIndex === sortedCurrentLessons.length - 1;

  // Если это последний урок, возвращаем ENDED
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
