import { createFileRoute } from '@tanstack/react-router';
import { lazy, Suspense, useEffect } from 'react';

import { getFirstUncompletedLesson } from '~/domains/education/entities/lesson';
import { CourseSidebar } from '~/domains/education/widgets/course-sidebar';
import { LessonTests } from '~/domains/education/widgets/lesson-tests';
import { useAppLayout } from '~/domains/global/widgets/layout';
import { MarkdownRenderer } from '~/domains/global/widgets/markdown-renderer';
import { fetchClient } from '~/shared/api';
import { PageLoader } from '~/shared/ui/common/page-loader';
import { Container } from '~/shared/ui/primitives/container';
import { Skeleton } from '~/shared/ui/primitives/skeleton';

const VideoPlayer = lazy(() =>
  import('~/shared/ui/common/video-player').then((module) => ({ default: module.VideoPlayer })),
);

export const Route = createFileRoute('/(education)/_guard/courses_/$course_/lessons_/$lesson')({
  component: RouteComponent,
  pendingComponent: () => <PageLoader type='layout' />,
  loader: async ({ params: { course, lesson } }) => {
    const courseLessonsData = await fetchClient.GET('/courses/{courseId}/lessons', {
      params: { path: { courseId: course } },
    });

    if (lesson === 'current' && courseLessonsData.data) {
      const activeLesson = getFirstUncompletedLesson(courseLessonsData.data.modules);
      const lessonData = await fetchClient.GET('/lessons/{lessonId}', {
        params: { path: { lessonId: activeLesson.id } },
      });

      return {
        courseLessons: courseLessonsData.data,
        lesson: lessonData.data,
      };
    }

    const lessonData = await fetchClient.GET('/lessons/{lessonId}', { params: { path: { lessonId: lesson } } });

    return {
      courseLessons: courseLessonsData.data,
      lesson: lessonData.data,
    };
  },
});

function RouteComponent() {
  const { sidebar, setSidebar } = useAppLayout();
  const { lesson } = Route.useLoaderData();

  useEffect(() => {
    if (!sidebar) {
      setSidebar(<CourseSidebar />);
    }

    return () => {
      setSidebar(null);
    };
  }, []);

  if (!lesson) {
    return null;
  }

  return (
    <Container size='md' title={lesson.title}>
      {lesson.video && (
        <Suspense fallback={<Skeleton className='aspect-video w-full rounded-md' />}>
          <VideoPlayer title={lesson.title} src={lesson.video.video_url} poster={lesson.video.poster_url} />
        </Suspense>
      )}
      <MarkdownRenderer content={lesson.content} />
      <LessonTests tests={lesson.tests} />
    </Container>
  );
}
