import { Trans } from '@lingui/react/macro';
import { useEffect, useState } from 'react';
import { PiCheckBold, PiXBold } from 'react-icons/pi';

import { ApiComponents } from '~/shared/api';
import { Button } from '~/shared/ui/primitives/button/button';
import { Flex } from '~/shared/ui/primitives/flex';
import { RadioGroup, RadioGroupItem } from '~/shared/ui/primitives/radio';
import { Typo } from '~/shared/ui/primitives/typo';

interface LessonTestProps {
  test: ApiComponents['TestWithVariants'];
  onComplete: (testId: string) => void;
}

type TestState = 'default' | 'correct' | 'incorrect';

const StateColors: Record<TestState, 'default' | 'success' | 'primary'> = {
  default: 'default',
  correct: 'success',
  incorrect: 'primary',
};

export function LessonTest({ test, onComplete }: LessonTestProps) {
  const [state, setState] = useState<TestState>('default');
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);

  useEffect(() => {
    if (state === 'incorrect') {
      const timeout = setTimeout(() => {
        setState('default');
      }, 3000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [state]);

  const handleCheck = () => {
    const correctVariantId = test.variants.find((variant) => variant.is_correct)?.id;

    if (selectedVariantId === correctVariantId) {
      setState('correct');
      onComplete(test.id);
    } else {
      setState('incorrect');
    }
  };

  const isCompleted = state === 'correct';

  return (
    <Flex col className='border-divider rounded-md border p-4'>
      <Typo size='base' weight='semibold'>
        {test.title}
      </Typo>
      <RadioGroup disabled={isCompleted} value={selectedVariantId} onValueChange={setSelectedVariantId}>
        {test.variants.map((variant) => (
          <Flex key={variant.id} className='gap-2'>
            <RadioGroupItem value={variant.id} id={`${test.id}-${variant.id}`} className='mt-1' />
            <label htmlFor={`${test.id}-${variant.id}`} className='flex flex-col gap-1'>
              <Typo size='base' weight='normal'>
                {variant.title}
              </Typo>
              {variant.is_correct && state === 'correct' && (
                <Typo size='sm' className='opacity-50'>
                  {variant.description}
                </Typo>
              )}
            </label>
          </Flex>
        ))}
      </RadioGroup>
      <Button
        color={StateColors[state]}
        isDisabled={!selectedVariantId}
        className='mt-auto gap-0'
        onClick={handleCheck}
      >
        {state === 'default' && <Trans>Проверить</Trans>}
        {state === 'correct' && (
          <>
            <PiCheckBold className='mr-2' />
            <Trans>Корректно</Trans>
          </>
        )}
        {state === 'incorrect' && (
          <>
            <PiXBold className='mr-2' />
            <Trans>Некорректно</Trans>
          </>
        )}
      </Button>
    </Flex>
  );
}
