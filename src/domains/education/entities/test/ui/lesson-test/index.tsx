import { Trans } from '@lingui/react/macro';
import { useState } from 'react';
import { PiCheckBold } from 'react-icons/pi';

import { ApiComponents } from '~/shared/api';
import { Button } from '~/shared/ui/primitives/button/button';
import { Flex } from '~/shared/ui/primitives/flex';
import { Typo } from '~/shared/ui/primitives/typo';

interface LessonTestProps {
  test: ApiComponents['TestWithVariants'];
  onComplete: (testId: string) => void;
}

export function LessonTest({ test, onComplete }: LessonTestProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  const handleCheck = () => {
    setIsCompleted(true);
    onComplete(test.id);
  };

  return (
    <Flex col className='border-divider rounded-md border p-4'>
      <Typo size='lg' weight='semibold'>
        {test.title}
      </Typo>
      <Button color={isCompleted ? 'success' : 'default'} className='mt-auto gap-0' onClick={handleCheck}>
        {isCompleted ? (
          <>
            <PiCheckBold className='mr-2' />
            <Trans>Корректно</Trans>
          </>
        ) : (
          <Trans>Проверить</Trans>
        )}
      </Button>
    </Flex>
  );
}
