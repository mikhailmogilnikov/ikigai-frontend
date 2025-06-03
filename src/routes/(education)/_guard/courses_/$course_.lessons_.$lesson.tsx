import { createFileRoute } from '@tanstack/react-router';
import { lazy, Suspense, useEffect } from 'react';

import { getFirstUncompletedLesson } from '~/domains/education/entities/lesson';
import { CourseSidebar } from '~/domains/education/widgets/course-sidebar';
import { LessonTests } from '~/domains/education/widgets/lesson-tests';
import { useAppLayout } from '~/domains/global/widgets/layout';
import { MarkdownRenderer } from '~/domains/global/widgets/markdown-renderer';
import { Container } from '~/shared/ui/primitives/container';
import { Skeleton } from '~/shared/ui/primitives/skeleton';
import { rqClient } from '~/shared/api';

const VideoPlayer = lazy(() =>
  import('~/shared/ui/common/video-player').then((module) => ({ default: module.VideoPlayer })),
);

export const Route = createFileRoute('/(education)/_guard/courses_/$course_/lessons_/$lesson')({
  component: RouteComponent,
  loader: async ({ context: { queryClient }, params: { course, lesson } }) => {
    const courseLessonsData = await queryClient.ensureQueryData(
      rqClient.queryOptions('get', '/courses/{courseId}/lessons', { params: { path: { courseId: course } } }),
    );

    if (lesson === 'current') {
      const activeLesson = getFirstUncompletedLesson(courseLessonsData.modules);

      await queryClient.ensureQueryData(
        rqClient.queryOptions('get', '/lessons/{lessonId}', {
          params: { path: { lessonId: activeLesson.id.toString() } },
        }),
      );

      return {
        activeLessonId: activeLesson.id,
      };
    }

    await queryClient.ensureQueryData(
      rqClient.queryOptions('get', '/lessons/{lessonId}', { params: { path: { lessonId: lesson } } }),
    );

    return {
      activeLessonId: lesson,
    };
  },
});

function RouteComponent() {
  const { setSidebar } = useAppLayout();

  const { course: courseId } = Route.useParams();
  const { activeLessonId } = Route.useLoaderData();

  const { data: courseLessons } = rqClient.useSuspenseQuery('get', '/courses/{courseId}/lessons', {
    params: { path: { courseId } },
  });
  const { data: lesson } = rqClient.useSuspenseQuery('get', '/lessons/{lessonId}', {
    params: { path: { lessonId: activeLessonId.toString() } },
  });

  useEffect(() => {
    setSidebar(
      <CourseSidebar courseLessons={courseLessons} courseId={courseId} activeLessonId={activeLessonId.toString()} />,
    );

    return () => {
      setSidebar(null);
    };
  }, [courseLessons, courseId, activeLessonId]);

  return (
    <Container size='md' title={lesson.title}>
      {lesson.video && (
        <Suspense fallback={<Skeleton className='aspect-video w-full rounded-md' />}>
          <VideoPlayer
            key={`${lesson.id.toString()}-${lesson.video.video_url}`}
            title={lesson.title}
            src={lesson.video.video_url}
            poster={lesson.video.poster_url}
          />
        </Suspense>
      )}
      <MarkdownRenderer content={lesson.content} />
      <LessonTests tests={lesson.tests} modules={courseLessons.modules} />
    </Container>
  );
}
