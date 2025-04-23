import { Plural, Trans } from '@lingui/react/macro';
import Switch, { Case } from 'react-switch-case';
import clsx from 'clsx';
import { PiFolderBold } from 'react-icons/pi';

import { cn } from '~/shared/lib/utils';
import { Flex } from '~/shared/ui/primitives/flex';
import { Image } from '~/shared/ui/primitives/image';
import { LinkButton } from '~/shared/ui/primitives/link-button';
import { Progress } from '~/shared/ui/primitives/progress';
import { Typo } from '~/shared/ui/primitives/typo';
import { Button } from '~/shared/ui/primitives/button/button';

import { CourseCollection, CourseShop } from '../../model/course.type';

interface CourseCardContentShopProps extends CourseShop {
  variant: 'shop';
}

interface CourseCardContentCollectionProps extends CourseCollection {
  variant: 'collection';
}

type CourseCardVariants = CourseCardContentShopProps | CourseCardContentCollectionProps;

type CourseCardProps = CourseCardVariants & {
  className?: string;
};

export function CourseCard(props: CourseCardProps) {
  const { className, title, imageUrl, variant } = props;

  return (
    <Flex col gap='none' className={cn('bg-default h-fit w-full overflow-clip rounded-xl shadow-md', className)}>
      <div className='bg-foreground/5 h-50 w-full overflow-hidden'>
        <Image src={imageUrl} alt={title} className='h-full w-full object-fill' />
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
  const { price, id, modulesCount, lessonsCount } = props as CourseCardProps & CourseCardContentShopProps;

  return (
    <>
      <Flex col gap='sm'>
        <Flex align='center' gap='sm' className='opacity-50'>
          <PiFolderBold />
          <Typo as='p' size='sm' weight='medium'>
            {modulesCount} <Plural value={modulesCount} one='модуль' few='модуля' many='модулей' /> · {lessonsCount}{' '}
            <Plural value={lessonsCount} one='урок' few='урока' many='уроков' />
          </Typo>
        </Flex>
      </Flex>
      <Typo as='p' size='xl' weight='semibold'>
        {Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(price)}
      </Typo>
      <Flex>
        <LinkButton to='/courses/$course' params={{ course: id }} className='dark:bg-foreground/5 w-full'>
          <Trans>Подробнее</Trans>
        </LinkButton>
        <Button className='w-full' color='primary'>
          <Trans>Купить</Trans>
        </Button>
      </Flex>
    </>
  );
}

function CourseCardContentCollection(props: CourseCardProps) {
  const { completedLessonsCount, id, lessonsCount, currentLessonId } = props as CourseCardProps &
    CourseCardContentCollectionProps;

  const isNotStarted = completedLessonsCount === 0;
  const isCompleted = completedLessonsCount === lessonsCount;
  const isInProgress = !isNotStarted && !isCompleted;

  const progress = (completedLessonsCount / lessonsCount) * 100;

  return (
    <>
      <Flex col gap='sm'>
        <Typo as='p' size='sm' weight='medium' className={clsx(isCompleted ? 'text-success' : 'opacity-50')}>
          <Trans>
            Пройдено уроков: {completedLessonsCount} / {lessonsCount}
          </Trans>
        </Typo>
        <Progress className='h-2' value={progress} trackClassName={cn(isCompleted && 'bg-success')} />
      </Flex>
      <Flex>
        <LinkButton to='/courses/$course' params={{ course: id }} className='dark:bg-foreground/5 w-full'>
          <Trans>Подробнее</Trans>
        </LinkButton>
        <LinkButton
          to='/courses/$course/lessons/$lesson'
          params={{ course: id, lesson: currentLessonId }}
          className='w-full'
          color={isCompleted ? 'success' : 'primary'}
        >
          {isNotStarted && <Trans>Начать</Trans>}
          {isInProgress && <Trans>Продолжить</Trans>}
          {isCompleted && <Trans>Повторить</Trans>}
        </LinkButton>
      </Flex>
    </>
  );
}
