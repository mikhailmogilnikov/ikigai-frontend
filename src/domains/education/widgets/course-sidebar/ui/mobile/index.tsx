import { SheetContent, SheetFooter, SheetHeader } from '~/shared/ui/overlays/sheet';
import { ApiComponents } from '~/shared/api';

import { CourseProgress } from '../course-progress';
import { CourseModules } from '../course-modules';

interface CourseSidebarMobileProps {
  courseLessons: ApiComponents['CourseLessons'];
  courseId: string;
  activeLessonId: string;
}

export function CourseSidebarMobile({ courseLessons, courseId, activeLessonId }: CourseSidebarMobileProps) {
  return (
    <>
      <SheetHeader>{courseLessons.title}</SheetHeader>
      <SheetContent>
        <CourseModules courseModules={courseLessons.modules} courseId={courseId} activeLessonId={activeLessonId} />
      </SheetContent>
      <SheetFooter>
        <CourseProgress
          completed_lessons_amount={courseLessons.completed_lessons_amount}
          lessons_amount={courseLessons.lessons_amount}
        />
      </SheetFooter>
    </>
  );
}
