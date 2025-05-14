import { useMediaQuery } from 'usehooks-ts';

import { BREAKPOINT_MOBILE } from '~/shared/config';
import { ApiComponents } from '~/shared/api';

import { CourseSidebarMobile } from './mobile';
import { CourseSidebarDesktop } from './desktop';

interface CourseSidebarProps {
  courseLessons: ApiComponents['CourseLessons'];
  courseId: string;
  activeLessonId: string;
}

export function CourseSidebar({ courseLessons, courseId, activeLessonId }: CourseSidebarProps) {
  const isMobile = useMediaQuery(BREAKPOINT_MOBILE);

  return isMobile ? (
    <CourseSidebarMobile courseLessons={courseLessons} courseId={courseId} activeLessonId={activeLessonId} />
  ) : (
    <CourseSidebarDesktop courseLessons={courseLessons} courseId={courseId} activeLessonId={activeLessonId} />
  );
}
