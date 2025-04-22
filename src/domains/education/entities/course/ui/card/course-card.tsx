import { Trans } from '@lingui/react/macro';
import Switch, { Case } from 'react-switch-case';

import { cn } from '~/shared/lib/utils';
import { Button } from '~/shared/ui/primitives/button/button';
import { Flex } from '~/shared/ui/primitives/flex';
import { Image } from '~/shared/ui/primitives/image';
import { LinkButton } from '~/shared/ui/primitives/link-button';
import { Progress } from '~/shared/ui/primitives/progress';
import { Typo } from '~/shared/ui/primitives/typo';

interface CourseCardContentShopProps {
  variant: 'shop';
  price: number;
}

interface CourseCardContentCollectionProps {
  variant: 'collection';
  completedLessonsCount: number;
}

type CourseCardVariants = CourseCardContentShopProps | CourseCardContentCollectionProps;

type CourseCardProps = CourseCardVariants & {
  className?: string;
  title: string;
  imageUrl: string;
  lessonsCount: number;
  courseId: string;
};

export function CourseCard(props: CourseCardProps) {
  const { className, title, imageUrl, variant } = props;

  return (
    <Flex col gap='none' className={cn('bg-default h-fit w-full overflow-clip rounded-xl shadow-md', className)}>
      <div className='bg-foreground/5 h-50 w-full overflow-hidden'>
        <Image src={imageUrl} alt={title} className='h-full w-full object-cover' />
      </div>
      <Flex col className='p-4'>
        <Typo as='h6' size='lg' weight='semibold'>
          {title}
        </Typo>

        <Switch condition={variant}>
          <Case value='shop'>
            <CourseCardContentShop {...props} />
          </Case>
          <Case value='collection'>
            <CourseCardContentCollection {...props} />
          </Case>
        </Switch>
      </Flex>
    </Flex>
  );
}

function CourseCardContentShop(props: CourseCardProps) {
  const { price } = props as CourseCardProps & CourseCardContentShopProps;

  return (
    <>
      <Typo as='p' size='sm' weight='semibold'>
        {Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(price)}
      </Typo>
      <Button className='bg-foreground/5 w-full'>
        <Trans>Подробнее</Trans>
      </Button>
    </>
  );
}

function CourseCardContentCollection(props: CourseCardProps) {
  const { completedLessonsCount, courseId, lessonsCount } = props as CourseCardProps & CourseCardContentCollectionProps;

  const isNotStarted = completedLessonsCount === 0;
  const isCompleted = completedLessonsCount === lessonsCount;
  const isInProgress = !isNotStarted && !isCompleted;

  const nextLesson = isCompleted ? 1 : completedLessonsCount + 1;

  const progress = (completedLessonsCount / lessonsCount) * 100;

  return (
    <>
      <Flex col gap='sm'>
        <Typo as='p' size='sm' weight='medium' className='opacity-50'>
          <Trans>
            Пройдено уроков: {completedLessonsCount} / {lessonsCount}
          </Trans>
        </Typo>
        <Progress className='h-2' value={progress} trackClassName={cn(isCompleted && 'bg-success')} />
      </Flex>
      <Flex>
        <LinkButton to='/courses/$course' params={{ course: courseId }} className='bg-foreground/5 w-full'>
          <Trans>Подробнее</Trans>
        </LinkButton>
        <LinkButton
          to='/courses/$course/lessons/$lesson'
          params={{ course: courseId, lesson: nextLesson.toString() }}
          className='w-full'
          color='primary'
        >
          {isNotStarted && <Trans>Начать</Trans>}
          {isInProgress && <Trans>Продолжить</Trans>}
          {isCompleted && <Trans>Повторить</Trans>}
        </LinkButton>
      </Flex>
    </>
  );
}
