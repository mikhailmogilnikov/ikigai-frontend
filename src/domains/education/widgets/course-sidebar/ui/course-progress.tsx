import { Trans } from '@lingui/react/macro';
import clsx from 'clsx';

import { Flex } from '~/shared/ui/primitives/flex';
import { Typo } from '~/shared/ui/primitives/typo';
import { Progress } from '~/shared/ui/primitives/progress';

interface CourseProgressProps {
  completed_lessons_amount: number;
  lessons_amount: number;
  title?: string;
}

export function CourseProgress({ completed_lessons_amount, lessons_amount, title }: CourseProgressProps) {
  const progress = (completed_lessons_amount / lessons_amount) * 100;

  const isCompleted = completed_lessons_amount === lessons_amount;

  return (
    <Flex col gap='sm' className='bg-default w-full rounded-lg p-4 shadow'>
      {title && (
        <Typo as='p' size='sm' weight='medium' className='mb-1'>
          {title}
        </Typo>
      )}
      <Typo as='p' size='sm' weight='medium' className={clsx(isCompleted ? 'text-success' : 'opacity-50')}>
        <Trans>
          Пройдено уроков: {completed_lessons_amount} / {lessons_amount}
        </Trans>
      </Typo>
      <Progress className='h-2' value={progress} trackClassName={clsx(isCompleted && 'bg-success')} />
    </Flex>
  );
}
