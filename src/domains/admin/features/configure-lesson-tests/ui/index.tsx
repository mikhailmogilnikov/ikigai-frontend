import { Trans, useLingui } from '@lingui/react/macro';
import { useBlocker } from '@tanstack/react-router';
import { useMemo, useState, useCallback, useEffect } from 'react';
import { PiFloppyDiskBackBold, PiPlusBold } from 'react-icons/pi';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';

import { Button } from '~/shared/ui/primitives/button/button';
import { Flex } from '~/shared/ui/primitives/flex';
import { Typo } from '~/shared/ui/primitives/typo';
import { rqClient } from '~/shared/api';

import { BackendTest, type Test, TemporalTest } from '../model/test.type';

import { TestCard } from './test';

interface LessonTestsConfiguratorProps {
  testsData: BackendTest[];
  lessonId: string;
}

export function LessonTestsConfigurator({ testsData, lessonId }: LessonTestsConfiguratorProps) {
  const { t } = useLingui();
  const [tests, setTests] = useState<Test[]>(testsData);
  const queryClient = useQueryClient();

  useEffect(() => {
    setTests(testsData);
  }, [testsData]);

  const { mutate: updateLesson, isPending: isUpdatingLesson } = rqClient.useMutation(
    'patch',
    '/admin/lessons/{lessonId}',
    {
      onSuccess: () => {
        void queryClient.invalidateQueries(
          rqClient.queryOptions('get', '/admin/lessons/{lessonId}', {
            params: { path: { lessonId } },
          }),
        );
        toast.success(t`Тесты сохранены`);
      },
    },
  );

  const isDirty = useMemo(() => {
    return JSON.stringify(tests) !== JSON.stringify(testsData);
  }, [tests, testsData]);

  useBlocker({
    shouldBlockFn: () => {
      if (!isDirty) return false;

      const shouldLeave = confirm(
        t`Вы уверены, что хотите покинуть страницу? Несохраненные изменения в тестах будут потеряны.`,
      );

      return !shouldLeave;
    },
  });

  const handleAddTest = useCallback(() => {
    const newTest: TemporalTest = {
      lesson_id: testsData[0]?.lesson_id || 1,
      title: '',
      order: tests.length + 1,
      variants: [
        {
          title: '',
          is_correct: true,
          description: null,
          order: 1,
          created_at: new Date().toISOString(),
        },
      ],
      created_at: new Date().toISOString(),
    };

    setTests((prev) => [...prev, newTest]);
  }, [tests.length, testsData]);

  const handleUpdateTest = useCallback((testId: string | number, updatedTest: Test) => {
    setTests((prev) =>
      prev.map((test) => {
        const currentId = 'id' in test ? test.id : test.created_at;

        return currentId === testId ? updatedTest : test;
      }),
    );
  }, []);

  const handleDeleteTest = useCallback((testId: string | number) => {
    setTests((prev) =>
      prev.filter((test) => {
        const currentId = 'id' in test ? test.id : test.created_at;

        return currentId !== testId;
      }),
    );
  }, []);

  const handleMoveTest = useCallback((testId: string | number, direction: 'up' | 'down') => {
    setTests((prev) => {
      const testIndex = prev.findIndex((test) => {
        const currentId = 'id' in test ? test.id : test.created_at;

        return currentId === testId;
      });

      if (testIndex === -1) return prev;

      const newTests = [...prev];
      const targetIndex = direction === 'up' ? testIndex - 1 : testIndex + 1;

      if (targetIndex < 0 || targetIndex >= newTests.length) return prev;

      // Меняем местами тесты
      [newTests[testIndex], newTests[targetIndex]] = [newTests[targetIndex], newTests[testIndex]];

      // Обновляем порядок
      newTests.forEach((test, index) => {
        test.order = index + 1;
      });

      return newTests;
    });
  }, []);

  const handleSave = useCallback(() => {
    updateLesson({
      body: {
        // @ts-expect-error - сложная типизация union типов, но функционально корректно
        tests,
      },
      params: {
        path: {
          lessonId,
        },
      },
    });
  }, [tests, lessonId]);

  return (
    <Flex col>
      <Flex className='mt-12 items-center justify-between'>
        <Typo size='lg' weight='semibold' className=''>
          <Trans>Тесты</Trans>
        </Typo>
        <Button className='w-fit' size='sm' onClick={handleAddTest}>
          <PiPlusBold />
          <Trans>Добавить тест</Trans>
        </Button>
      </Flex>

      <Flex col className='gap-4'>
        {tests.map((test, index) => (
          <TestCard
            key={'id' in test ? test.id : test.created_at}
            test={test}
            testIndex={index}
            totalTests={tests.length}
            onUpdate={handleUpdateTest}
            onDelete={handleDeleteTest}
            onMove={handleMoveTest}
          />
        ))}
      </Flex>

      <Button color='success' className='my-4' isDisabled={!isDirty} onClick={handleSave} isLoading={isUpdatingLesson}>
        <PiFloppyDiskBackBold />
        <Trans>Сохранить тесты</Trans>
      </Button>
    </Flex>
  );
}
