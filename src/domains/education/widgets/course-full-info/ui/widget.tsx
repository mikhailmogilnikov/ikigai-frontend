import { Trans } from '@lingui/react/macro';
import clsx from 'clsx';
import { useParams } from '@tanstack/react-router';

import { Flex } from '~/shared/ui/primitives/flex';
import { Image } from '~/shared/ui/primitives/image';
import { Typo } from '~/shared/ui/primitives/typo';
import { Progress } from '~/shared/ui/primitives/progress';
import { ApiComponents } from '~/shared/api';
import { LinkButton } from '~/shared/ui/primitives/link-button';
import { Divider } from '~/shared/ui/primitives/divider';

import { CourseFullInfoProps } from '.';

export function CourseFullInfoWidget({ course }: CourseFullInfoProps) {
  return (
    <Flex col gap='none' className='bg-default overflow-clip rounded-lg'>
      <Image
        className='border-divider aspect-[3/2] w-full overflow-clip rounded-t-lg border'
        src={course.image_url}
        alt={course.title}
      />
      <Flex col className='p-4'>
        {course.is_purchased ? (
          <CourseFullInfoWidgetContentPurchased
            completed_lessons_amount={course.completed_lessons_amount}
            lessons_amount={course.lessons_amount}
          />
        ) : (
          <CourseFullInfoWidgetContentNotPurchased price={course.price} />
        )}
      </Flex>
    </Flex>
  );
}

const CourseFullInfoWidgetContentPurchased = (
  props: Pick<ApiComponents['FullCourse'], 'completed_lessons_amount' | 'lessons_amount'>,
) => {
  const { course } = useParams({ from: '/(education)/_guard/courses_/$course' });
  const { completed_lessons_amount, lessons_amount } = props;

  const isCompleted = completed_lessons_amount === lessons_amount;
  const isNotStarted = completed_lessons_amount === 0;
  const isInProgress = !isNotStarted && !isCompleted;

  const progress = completed_lessons_amount ? (completed_lessons_amount / lessons_amount) * 100 : 0;

  return (
    <>
      <Flex col gap='sm' className='-mt-0.5 w-full'>
        <Typo as='p' size='sm' weight='medium' className={clsx(isCompleted ? 'text-success' : 'opacity-50')}>
          <Trans>
            Пройдено уроков: {completed_lessons_amount} / {lessons_amount}
          </Trans>
        </Typo>
        <Progress className='h-2' value={progress} trackClassName={clsx(isCompleted && 'bg-success')} />
      </Flex>
      <Divider />
      <LinkButton
        to='/courses/$course/lessons/$lesson'
        params={{ course: course, lesson: 'current' }}
        className='w-full'
        color={isCompleted ? 'success' : 'primary'}
      >
        {isNotStarted && <Trans>Начать курс</Trans>}
        {isInProgress && <Trans>Продолжить обучение</Trans>}
        {isCompleted && <Trans>Повторить курс</Trans>}
      </LinkButton>
    </>
  );
};

const CourseFullInfoWidgetContentNotPurchased = ({ price }: { price: number }) => {
  return (
    <>
      <Typo as='p' size='xl' weight='semibold'>
        {Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(price)}
      </Typo>
    </>
  );
};
