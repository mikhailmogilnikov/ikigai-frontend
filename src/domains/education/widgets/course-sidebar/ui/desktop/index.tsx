import { ApiComponents } from '~/shared/api';
import { ScrollArea } from '~/shared/ui/primitives/scrollarea';

import { CourseProgress } from '../course-progress';
import { CourseModules } from '../course-modules';

interface CourseSidebarDesktopProps {
  courseLessons: ApiComponents['CourseLessons'];
  courseId: string;
  activeLessonId: string;
}

export function CourseSidebarDesktop({ courseLessons, courseId, activeLessonId }: CourseSidebarDesktopProps) {
  return (
    <div className='flex flex-col gap-3'>
      <CourseProgress
        completed_lessons_amount={courseLessons.completed_lessons_amount}
        lessons_amount={courseLessons.lessons_amount}
        title={courseLessons.title}
      />
      <ScrollArea type='hover' className='h-[calc(100vh-50*var(--spacing))]'>
        <CourseModules courseModules={courseLessons.modules} courseId={courseId} activeLessonId={activeLessonId} />
      </ScrollArea>
    </div>
  );
}
