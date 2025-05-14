import { Trans } from '@lingui/react/macro';
import { useNavigate } from '@tanstack/react-router';
import { useEffect, useRef, useState } from 'react';
import { PiArrowRightBold } from 'react-icons/pi';

import { useCompletedCourseModal } from '~/domains/education/entities/course';
import { getNextUncompletedLesson } from '~/domains/education/entities/lesson';
import { LessonTest } from '~/domains/education/entities/test';
import { ApiComponents } from '~/shared/api';
import { Button } from '~/shared/ui/primitives/button/button';
import { Flex } from '~/shared/ui/primitives/flex';
import { Typo } from '~/shared/ui/primitives/typo';

interface LessonTestsProps {
  tests: ApiComponents['TestWithVariants'][];
  modules: ApiComponents['ModuleWithLessons'][];
  lessonId: string;
}

export function LessonTests({ tests, modules, lessonId }: LessonTestsProps) {
  const navigate = useNavigate();
  const [completedTestsIds, setCompletedTestsIds] = useState<string[]>([]);

  const { onOpenChange } = useCompletedCourseModal();

  const currentLessonRef = useRef<string>(lessonId);

  const testsLength = tests.length;
  const completedTestsLength = completedTestsIds.length;

  const handleTestComplete = (testId: string) => {
    if (completedTestsIds.includes(testId)) return;

    setCompletedTestsIds((prev) => [...prev, testId]);
  };

  const isNextLessonDisabled = completedTestsLength !== testsLength;

  const handleNextLesson = () => {
    if (isNextLessonDisabled) return;
    const nextLesson = getNextUncompletedLesson(modules, lessonId);

    if (nextLesson === 'ENDED') {
      onOpenChange();
      void navigate({
        to: '/',
      });

      return;
    }

    void navigate({
      to: '/courses/$course/lessons/$lesson',
      params: { course: '6', lesson: nextLesson.id },
    });
  };

  useEffect(() => {
    if (currentLessonRef.current !== lessonId) {
      setCompletedTestsIds([]);
      currentLessonRef.current = lessonId;
    }
  }, [lessonId]);

  return (
    <Flex col gap='lg' className='mt-6'>
      {testsLength > 0 && (
        <Flex col>
          <Typo size='2xl' weight='semibold'>
            <Trans>Проверьте себя</Trans>
          </Typo>
          <Typo size='base' className='opacity-50' weight='normal'>
            <Trans>Прежде чем перейти к следующему уроку, пройдите тесты по усвоенному материалу.</Trans>
          </Typo>
          {tests.map((test) => (
            <LessonTest key={test.id} test={test} onComplete={handleTestComplete} />
          ))}
        </Flex>
      )}
      <Button isDisabled={isNextLessonDisabled} onClick={handleNextLesson} className='mb-5' color='primary'>
        <Trans>Следующий урок</Trans>
        <PiArrowRightBold />
      </Button>
    </Flex>
  );
}
