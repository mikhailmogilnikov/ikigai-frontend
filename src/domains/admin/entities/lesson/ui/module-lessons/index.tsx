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

interface ModuleLessonsProps {
  lessons: ApiComponents['AdminLesson'][];
}

export function ModuleLessons({ lessons }: ModuleLessonsProps) {
  const { course, module } = useParams({ from: '/admin/_guard/courses_/$course_/modules_/$module' });
  const queryClient = useQueryClient();
  const { t } = useLingui();

  const { mutate: reorderLessons } = rqClient.useMutation('put', '/admin/modules/{moduleId}/lessons/reorder', {
    onError: () => {
      toast.error(t`Не удалось переместить уроки`);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(
        rqClient.queryOptions('get', '/admin/modules/{moduleId}/lessons', {
          params: { path: { moduleId: module } },
        }),
      );
      toast.success(t`Уроки успешно перемещены`);
    },
  });

  const sortLessons = () => lessons.sort((a, b) => a.order - b.order);

  const [sortedLessons, setSortedLessons] = useState<ApiComponents['AdminLesson'][]>(sortLessons());

  useEffect(() => {
    setSortedLessons(sortLessons());
  }, [lessons]);

  const isLessonsChanged = useMemo(() => {
    return JSON.stringify(sortLessons()) !== JSON.stringify(sortedLessons);
  }, [sortedLessons]);

  const handleMoveLesson = (lesson: ApiComponents['AdminLesson'], direction: 'up' | 'down') => {
    const newLessons = [...sortedLessons];
    const index = newLessons.findIndex((l) => l.id === lesson.id);
    const newIndex = direction === 'up' ? index - 1 : index + 1;

    newLessons[index] = newLessons[newIndex];
    newLessons[newIndex] = lesson;

    setSortedLessons(newLessons);
  };

  const handleSaveLessons = () => {
    const mappedLessons = sortedLessons.map((lesson) => ({
      id: lesson.id,
      order: lesson.order,
    }));

    reorderLessons({ body: mappedLessons, params: { path: { moduleId: module } } });
  };

  return (
    <Flex col>
      {sortedLessons.map((lesson, index) => {
        const isFirst = index === 0;
        const isLast = index === sortedLessons.length - 1;

        return (
          <Link
            to='/admin/courses/$course/modules/$module/lessons/$lesson'
            params={{ course, module, lesson: lesson.id.toString() }}
            key={lesson.id}
          >
            <Flex className='border-divider items-start rounded-lg border p-4'>
              <Flex col className='w-full items-start'>
                <Typo>{lesson.title}</Typo>
                <Flex className='items-center gap-2'>
                  <Chip size='sm' color={lesson.published ? 'success' : 'warning'}>
                    {lesson.published ? <Trans>Опубликован</Trans> : <Trans>Не опубликован</Trans>}
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
                    handleMoveLesson(lesson, 'up');
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
                    handleMoveLesson(lesson, 'down');
                  }}
                >
                  <PiCaretDownBold />
                </Button>
              </Flex>
            </Flex>
          </Link>
        );
      })}
      <Button color='success' className='my-4' onClick={handleSaveLessons} isDisabled={!isLessonsChanged}>
        <Trans>Сохранить расположение уроков</Trans>
      </Button>
    </Flex>
  );
}
