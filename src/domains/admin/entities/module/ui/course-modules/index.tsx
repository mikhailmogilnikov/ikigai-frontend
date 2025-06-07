import { Trans, useLingui } from '@lingui/react/macro';
import { useQueryClient } from '@tanstack/react-query';
import { Link, useParams } from '@tanstack/react-router';
import { useEffect, useMemo, useState } from 'react';
import { PiCaretDownBold, PiCaretUpBold } from 'react-icons/pi';
import { toast } from 'sonner';

import { ApiComponents, rqClient } from '~/shared/api';
import { Button } from '~/shared/ui/primitives/button/button';
import { Chip } from '~/shared/ui/primitives/chip';
import { Flex } from '~/shared/ui/primitives/flex';
import { Typo } from '~/shared/ui/primitives/typo';

interface CourseModulesProps {
  modules: ApiComponents['AdminModule'][];
}

export function CourseModules({ modules }: CourseModulesProps) {
  const { course } = useParams({ from: '/admin/_guard/courses_/$course' });
  const queryClient = useQueryClient();
  const { t } = useLingui();

  const { mutate: reorderModules } = rqClient.useMutation('put', '/admin/courses/{courseId}/modules/reorder', {
    onError: () => {
      toast.error(t`Не удалось переместить модули`);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(
        rqClient.queryOptions('get', '/admin/courses/{courseId}/modules', {
          params: { path: { courseId: course } },
        }),
      );
      toast.success(t`Модули успешно перемещены`);
    },
  });

  const sortModules = () => modules.sort((a, b) => a.order - b.order);

  const [sortedModules, setSortedModules] = useState<ApiComponents['AdminModule'][]>(sortModules());

  useEffect(() => {
    setSortedModules(sortModules());
  }, [modules]);

  const isModulesChanged = useMemo(() => {
    return JSON.stringify(sortModules()) !== JSON.stringify(sortedModules);
  }, [sortedModules]);

  const handleMoveModule = (module: ApiComponents['AdminModule'], direction: 'up' | 'down') => {
    const newModules = [...sortedModules];
    const index = newModules.findIndex((m) => m.id === module.id);
    const newIndex = direction === 'up' ? index - 1 : index + 1;

    newModules[index] = newModules[newIndex];
    newModules[newIndex] = module;

    // Обновляем поле order для всех модулей в соответствии с их новой позицией
    const updatedModules = newModules.map((mod, idx) => ({
      ...mod,
      order: idx + 1,
    }));

    setSortedModules(updatedModules);
  };

  const handleSaveModules = () => {
    const mappedModules = sortedModules.map((module, index) => ({
      id: module.id,
      order: index + 1,
    }));

    reorderModules({ body: mappedModules, params: { path: { courseId: course } } });
  };

  return (
    <Flex col>
      {sortedModules.map((module, index) => {
        const isFirst = index === 0;
        const isLast = index === sortedModules.length - 1;

        return (
          <Link
            to='/admin/courses/$course/modules/$module'
            params={{ course, module: module.id.toString() }}
            key={module.id}
          >
            <Flex className='border-divider items-start rounded-lg border p-4'>
              <Flex col className='w-full items-start'>
                <Typo>{module.title}</Typo>
                <Flex className='items-center gap-2'>
                  <Chip size='sm' color={module.published ? 'success' : 'warning'}>
                    {module.published ? <Trans>Опубликован</Trans> : <Trans>Не опубликован</Trans>}
                  </Chip>

                  <Chip size='sm'>
                    <Trans>3 урока</Trans>
                  </Chip>
                </Flex>
              </Flex>
              <Flex col className='items-center gap-2'>
                <Button
                  size='sm'
                  isDisabled={isFirst}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleMoveModule(module, 'up');
                  }}
                >
                  <PiCaretUpBold />
                </Button>
                <Button
                  variant='bordered'
                  size='sm'
                  isDisabled={isLast}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleMoveModule(module, 'down');
                  }}
                >
                  <PiCaretDownBold />
                </Button>
              </Flex>
            </Flex>
          </Link>
        );
      })}
      <Button color='success' className='my-4' onClick={handleSaveModules} isDisabled={!isModulesChanged}>
        <Trans>Сохранить расположение модулей</Trans>
      </Button>
    </Flex>
  );
}
