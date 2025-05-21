import { useMediaQuery } from 'usehooks-ts';

import { ApiComponents } from '~/shared/api';
import { BREAKPOINT_MOBILE } from '~/shared/config';
import { Flex } from '~/shared/ui/primitives/flex';

import { CourseFullInfoMobile } from './mobile';
import { CourseFullInfoDesktop } from './desktop';

export interface CourseFullInfoProps {
  course: ApiComponents['FullCourse'];
}

export function CourseFullInfo({ course }: CourseFullInfoProps) {
  const isMobile = useMediaQuery(BREAKPOINT_MOBILE);

  return (
    <Flex gap='lg'>
      {isMobile ? <CourseFullInfoMobile course={course} /> : <CourseFullInfoDesktop course={course} />}
    </Flex>
  );
}
