import { PiCaretDownBold, PiCaretUpBold, PiPlusBold, PiTrashBold } from 'react-icons/pi';
import { Trans, useLingui } from '@lingui/react/macro';
import { useCallback } from 'react';

import { Flex } from '~/shared/ui/primitives/flex';
import { Button } from '~/shared/ui/primitives/button/button';
import { Input, InputLabel } from '~/shared/ui/primitives/input';
import { Typo } from '~/shared/ui/primitives/typo';
import { Switch } from '~/shared/ui/primitives/switch';

import { type Test } from '../model/test.type';

interface TestProps {
  test: Test;
  testIndex: number;
  totalTests: number;
  onUpdate: (testId: string | number, updatedTest: Test) => void;
  onDelete: (testId: string | number) => void;
  onMove: (testId: string | number, direction: 'up' | 'down') => void;
}

export function TestCard({ test, testIndex, totalTests, onUpdate, onDelete, onMove }: TestProps) {
  const { t } = useLingui();

  const testId = 'id' in test ? test.id : test.created_at;
  const correctAnswer = test.variants.find((variant) => variant.is_correct);

  const handleTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const updatedTest = { ...test, title: e.target.value };

      onUpdate(testId, updatedTest);
    },
    [test, testId, onUpdate],
  );

  const handleCorrectAnswerDescriptionChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const updatedTest = {
        ...test,
        variants: test.variants.map((variant) =>
          variant.is_correct ? { ...variant, description: e.target.value } : variant,
        ),
      };

      // @ts-expect-error - сложная типизация union типов, но функционально корректно
      onUpdate(testId, updatedTest);
    },
    [test, testId, onUpdate],
  );

  const handleVariantTitleChange = useCallback(
    (variantId: string | number, newTitle: string) => {
      const updatedTest = {
        ...test,
        variants: test.variants.map((variant) =>
          ('id' in variant ? variant.id : variant.created_at) === variantId ? { ...variant, title: newTitle } : variant,
        ),
      };

      // @ts-expect-error - сложная типизация union типов, но функционально корректно
      onUpdate(testId, updatedTest);
    },
    [test, testId, onUpdate],
  );

  const handleVariantCorrectToggle = useCallback(
    (variantId: string | number) => {
      const updatedTest = {
        ...test,
        variants: test.variants.map((variant) => {
          const currentVariantId = 'id' in variant ? variant.id : variant.created_at;

          return {
            ...variant,
            is_correct: currentVariantId === variantId,
          };
        }),
      };

      // @ts-expect-error - сложная типизация union типов, но функционально корректно
      onUpdate(testId, updatedTest);
    },
    [test, testId, onUpdate],
  );

  const handleAddVariant = useCallback(() => {
    const newVariant = {
      title: '',
      is_correct: false,
      description: null,
      order: test.variants.length + 1,
      created_at: new Date().toISOString(),
    };

    const updatedTest = {
      ...test,
      variants: [...test.variants, newVariant],
    };

    // @ts-expect-error - сложная типизация union типов, но функционально корректно
    onUpdate(testId, updatedTest);
  }, [test, testId, onUpdate]);

  const handleDeleteVariant = useCallback(
    (variantId: string | number) => {
      if (test.variants.length <= 2) {
        return; // Не позволяем удалять, если остается меньше 2 вариантов
      }

      const updatedTest = {
        ...test,
        variants: test.variants.filter((variant) => {
          const currentVariantId = 'id' in variant ? variant.id : variant.created_at;

          return currentVariantId !== variantId;
        }),
      };

      // @ts-expect-error - сложная типизация union типов, но функционально корректно
      onUpdate(testId, updatedTest);
    },
    [test, testId, onUpdate],
  );

  const handleMoveUp = useCallback(() => {
    onMove(testId, 'up');
  }, [testId, onMove]);

  const handleMoveDown = useCallback(() => {
    onMove(testId, 'down');
  }, [testId, onMove]);

  const handleDeleteTest = useCallback(() => {
    if (confirm(t`Вы уверены, что хотите удалить этот тест?`)) {
      onDelete(testId);
    }
  }, [testId, onDelete, t]);

  return (
    <Flex className='gap-4'>
      <Flex col className='border-divider w-full rounded-lg border p-4'>
        <InputLabel htmlFor={`question-${String(testId)}`} label={t`Вопрос`}>
          <Input
            id={`question-${String(testId)}`}
            className='bg-default'
            value={test.title}
            onChange={handleTitleChange}
            placeholder={t`Введите вопрос`}
          />
        </InputLabel>

        <InputLabel htmlFor={`correct-answer-${String(testId)}`} label={t`Описание правильного варианта`}>
          <Input
            id={`correct-answer-${String(testId)}`}
            className='bg-default'
            value={correctAnswer?.description ?? ''}
            onChange={handleCorrectAnswerDescriptionChange}
            placeholder={t`Описание правильного ответа`}
          />
        </InputLabel>

        <Typo size='sm' weight='semibold' className='mb-2 mt-4'>
          <Trans>Варианты ответа</Trans>
        </Typo>

        <Flex col className='gap-2'>
          {test.variants.map((variant) => {
            const variantId = 'id' in variant ? variant.id : variant.created_at;

            return (
              <Flex key={variantId} className='items-center gap-2'>
                <Switch
                  checked={variant.is_correct}
                  onCheckedChange={() => {
                    handleVariantCorrectToggle(variantId);
                  }}
                />
                <Input
                  id={`variant-${String(variantId)}`}
                  className='bg-default flex-1'
                  value={variant.title}
                  onChange={(e) => {
                    handleVariantTitleChange(variantId, e.target.value);
                  }}
                  placeholder={t`Введите вариант ответа`}
                />
                <Button
                  className='w-fit shrink-0'
                  onClick={() => {
                    handleDeleteVariant(variantId);
                  }}
                  isDisabled={test.variants.length <= 2}
                >
                  <PiTrashBold className='text-danger' />
                </Button>
              </Flex>
            );
          })}
          <Button className='mt-2 w-fit' size='sm' onClick={handleAddVariant}>
            <PiPlusBold />
            <Trans>Добавить вариант</Trans>
          </Button>
        </Flex>
      </Flex>

      <Flex col className='gap-2'>
        <Button className='w-fit' size='sm' onClick={handleMoveUp} isDisabled={testIndex === 0}>
          <PiCaretUpBold />
        </Button>
        <Button className='w-fit' size='sm' onClick={handleMoveDown} isDisabled={testIndex === totalTests - 1}>
          <PiCaretDownBold />
        </Button>
        <Button className='w-fit' size='sm' onClick={handleDeleteTest}>
          <PiTrashBold className='text-danger' />
        </Button>
      </Flex>
    </Flex>
  );
}
