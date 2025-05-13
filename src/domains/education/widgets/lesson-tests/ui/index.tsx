import { Trans } from '@lingui/react/macro';
import { useState } from 'react';
import { PiArrowRightBold } from 'react-icons/pi';

import { LessonTest } from '~/domains/education/entities/test';
import { ApiComponents } from '~/shared/api';
import { Button } from '~/shared/ui/primitives/button/button';
import { Flex } from '~/shared/ui/primitives/flex';
import { Typo } from '~/shared/ui/primitives/typo';

interface LessonTestsProps {
  tests: ApiComponents['TestWithVariants'][];
}

export function LessonTests({ tests }: LessonTestsProps) {
  const [completedTestsIds, setCompletedTestsIds] = useState<string[]>([]);

  const testsLength = tests.length;
  const completedTestsLength = completedTestsIds.length;

  const handleTestComplete = (testId: string) => {
    if (completedTestsIds.includes(testId)) return;

    setCompletedTestsIds((prev) => [...prev, testId]);
  };

  // const handleNextLesson = () => {
  // };

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
      <Button isDisabled={completedTestsLength !== testsLength} className='mb-5 gap-0' color='primary'>
        <Trans>Следующий урок</Trans>
        <PiArrowRightBold className='ml-2' />
      </Button>
    </Flex>
  );
}
