import { createFileRoute } from '@tanstack/react-router';
import { lazy, Suspense, useEffect } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';

import { getFirstUncompletedLesson } from '~/domains/education/entities/lesson';
import { getCourseLessonsQuery } from '~/domains/education/entities/course/api';
import { CourseSidebar } from '~/domains/education/widgets/course-sidebar';
import { LessonTests } from '~/domains/education/widgets/lesson-tests';
import { useAppLayout } from '~/domains/global/widgets/layout';
import { MarkdownRenderer } from '~/domains/global/widgets/markdown-renderer';
import { PageLoader } from '~/shared/ui/common/page-loader';
import { Container } from '~/shared/ui/primitives/container';
import { Skeleton } from '~/shared/ui/primitives/skeleton';
import { getLessonQuery } from '~/domains/education/entities/lesson/api';

const VideoPlayer = lazy(() =>
  import('~/shared/ui/common/video-player').then((module) => ({ default: module.VideoPlayer })),
);

export const Route = createFileRoute('/(education)/_guard/courses_/$course_/lessons_/$lesson')({
  component: RouteComponent,
  pendingComponent: () => <PageLoader type='layout' />,
  loader: async ({ context: { queryClient }, params: { course, lesson } }) => {
    const courseLessonsData = await queryClient.ensureQueryData(getCourseLessonsQuery(course));

    if (lesson === 'current' && courseLessonsData.data) {
      const activeLesson = getFirstUncompletedLesson(courseLessonsData.data.modules);

      await queryClient.ensureQueryData(getLessonQuery(activeLesson.id));

      return {
        activeLessonId: activeLesson.id,
      };
    }

    await queryClient.ensureQueryData(getLessonQuery(lesson));

    return {
      activeLessonId: lesson,
    };
  },
});

function RouteComponent() {
  const { setSidebar } = useAppLayout();

  const { course: courseId } = Route.useParams();
  const { activeLessonId } = Route.useLoaderData();

  const { data: courseLessons } = useSuspenseQuery(getCourseLessonsQuery(courseId));
  const { data: lesson } = useSuspenseQuery(getLessonQuery(activeLessonId));

  useEffect(() => {
    if (courseLessons.data) {
      setSidebar(
        <CourseSidebar courseLessons={courseLessons.data} courseId={courseId} activeLessonId={activeLessonId} />,
      );
    }

    return () => {
      setSidebar(null);
    };
  }, [courseLessons, courseId, activeLessonId]);

  if (!lesson.data || !courseLessons.data) return null;

  return (
    <Container size='md' title={lesson.data.title}>
      {lesson.data.video && (
        <Suspense fallback={<Skeleton className='aspect-video w-full rounded-md' />}>
          <VideoPlayer
            key={`${lesson.data.id}-${lesson.data.video.video_url}`}
            title={lesson.data.title}
            src={lesson.data.video.video_url}
            poster={lesson.data.video.poster_url}
          />
        </Suspense>
      )}
      <MarkdownRenderer content={lesson.data.content} />
      <LessonTests tests={lesson.data.tests} modules={courseLessons.data.modules} />
    </Container>
  );
}
