import { Flex } from '~/shared/ui/primitives/flex';
import { Typo } from '~/shared/ui/primitives/typo';

import { CourseFullInfoProps } from '../index';
import { CourseFullInfoModules } from '../modules';
import { CourseFullInfoAbout } from '../info';
import { CourseFullInfoWidget } from '../widget';

export function CourseFullInfoDesktop({ course }: CourseFullInfoProps) {
  return (
    <>
      <Flex col className='mt-4 w-full'>
        <Typo as='h2' size='2xl' weight='semibold'>
          {course.title}
        </Typo>

        <CourseFullInfoAbout course={course} />

        <CourseFullInfoModules course={course} />
      </Flex>
      <Flex col className='sticky top-4 h-min w-72 shrink-0'>
        <CourseFullInfoWidget course={course} />
      </Flex>
    </>
  );
}
