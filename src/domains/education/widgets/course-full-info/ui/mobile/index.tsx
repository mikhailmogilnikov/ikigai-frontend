import { Flex } from '~/shared/ui/primitives/flex';
import { Typo } from '~/shared/ui/primitives/typo';

import { CourseFullInfoProps } from '../index';
import { CourseFullInfoAbout } from '../info';
import { CourseFullInfoModules } from '../modules';
import { CourseFullInfoWidget } from '../widget';

export function CourseFullInfoMobile({ course }: CourseFullInfoProps) {
  return (
    <Flex col className='w-full'>
      <Typo as='h2' size='2xl' weight='semibold'>
        {course.title}
      </Typo>
      <CourseFullInfoWidget course={course} />
      <CourseFullInfoAbout course={course} />
      <CourseFullInfoModules course={course} />
    </Flex>
  );
}
