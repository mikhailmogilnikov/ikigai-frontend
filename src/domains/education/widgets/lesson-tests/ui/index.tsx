import { Trans } from '@lingui/react/macro';
import { useNavigate, useLoaderData, useParams } from '@tanstack/react-router';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { PiArrowRightBold } from 'react-icons/pi';

import { useCompletedCourseModal } from '~/domains/education/entities/course';
import { LessonTest } from '~/domains/education/entities/test';
import { ApiComponents, rqClient } from '~/shared/api';
import { Button } from '~/shared/ui/primitives/button/button';
import { Flex } from '~/shared/ui/primitives/flex';
import { Typo } from '~/shared/ui/primitives/typo';
import { useAppLayout } from '~/domains/global/widgets/layout';
import { getNextLesson } from '~/domains/education/entities/lesson';

interface LessonTestsProps {
  tests: ApiComponents['TestWithVariants'][];
  modules: ApiComponents['ModuleWithLessons'][];
}

export function LessonTests({ tests, modules }: LessonTestsProps) {
  const navigate = useNavigate();
  const { course } = useParams({ from: '/(education)/_guard/courses_/$course_/lessons_/$lesson' });
  const loaderData = useLoaderData({ from: '/(education)/_guard/courses_/$course_/lessons_/$lesson' });
  const queryClient = useQueryClient();

  const { onOpenChange } = useCompletedCourseModal();
  const { scrollToTop } = useAppLayout();

  const { mutateAsync, isPending } = rqClient.useMutation('post', '/lessons/{lessonId}/complete', {
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ['course-lessons', course] });
    },
  });

  const activeLessonId = loaderData.activeLessonId;

  const currentLessonRef = useRef<string>(activeLessonId);

  const [completedTestsIds, setCompletedTestsIds] = useState<string[]>([]);

  const testsLength = tests.length;
  const completedTestsLength = completedTestsIds.length;

  const handleTestComplete = (testId: string) => {
    if (completedTestsIds.includes(testId)) return;

    setCompletedTestsIds((prev) => [...prev, testId]);
  };

  const isNextLessonDisabled = completedTestsLength !== testsLength;

  const handleNextLesson = async () => {
    if (isNextLessonDisabled) return;

    const currentLesson = modules.flatMap((module) => module.lessons).find((lesson) => lesson.id === activeLessonId);

    if (!currentLesson?.is_completed) {
      await mutateAsync({ body: { lessonId: activeLessonId } });
    }

    const nextLesson = getNextLesson(modules, activeLessonId);

    if (nextLesson === 'ENDED') {
      onOpenChange();
      void navigate({
        to: '/',
      });

      return;
    }

    scrollToTop();
    void navigate({
      to: '/courses/$course/lessons/$lesson',
      params: { course: course, lesson: nextLesson.id },
    });
  };

  useEffect(() => {
    if (currentLessonRef.current !== activeLessonId) {
      setCompletedTestsIds([]);
      currentLessonRef.current = activeLessonId;
    }
  }, [activeLessonId]);

  return (
    <Flex col gap='lg' className='mt-6'>
      {testsLength > 0 && (
        <Flex col>
          <Typo size='2xl' weight='semibold'>
            <Trans>Проверьте себя</Trans>
          </Typo>
          <Typo size='base' className='opacity-50' weight='normal'>
            <Trans>Прежде чем завершить урок, пройдите тесты по усвоенному материалу.</Trans>
          </Typo>
          {tests.map((test) => (
            <LessonTest key={test.id} test={test} onComplete={handleTestComplete} />
          ))}
        </Flex>
      )}
      <Button
        isDisabled={isNextLessonDisabled}
        onClick={() => void handleNextLesson()}
        isLoading={isPending}
        className='mb-5'
        color='primary'
      >
        <Trans>Следующий урок</Trans>
        <PiArrowRightBold />
      </Button>
    </Flex>
  );
}
