import { Plural } from '@lingui/react/macro';

import { Flex } from '~/shared/ui/primitives/flex';
import { Typo } from '~/shared/ui/primitives/typo';

import { CourseFullInfoProps } from '../index';

export function CourseFullInfoAbout({ course }: CourseFullInfoProps) {
  return (
    <Flex col className='w-full'>
      <Typo as='p' size='base' weight='medium' className='opacity-50'>
        {course.description}
      </Typo>

      <Flex className='bg-default mt-4 w-full justify-around rounded-lg p-4'>
        {COURSE_INFO_ITEMS.map((item) => (
          <Flex key={item.id} className='flex-col items-center gap-1'>
            <Typo as='p' size='xl' weight='semibold'>
              {course[item.id]}
            </Typo>
            <Typo as='p' size='base' weight='medium' className='opacity-50'>
              {item.label(course[item.id])}
            </Typo>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
}

const COURSE_INFO_ITEMS = [
  {
    id: 'videos_amount',
    label: (amount: number) => <Plural value={amount} one='Видео' few='Видео' many='Видео' />,
  },
  {
    id: 'lessons_amount',
    label: (amount: number) => <Plural value={amount} one='Урок' few='Урока' many='Уроков' />,
  },
  {
    id: 'modules_amount',
    label: (amount: number) => <Plural value={amount} one='Модуль' few='Модуля' many='Модулей' />,
  },
] as const;
