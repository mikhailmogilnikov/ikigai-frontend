import { useLingui } from '@lingui/react/macro';
import { createFileRoute } from '@tanstack/react-router';
import { lazy, Suspense, useEffect } from 'react';

import { CourseSidebar } from '~/domains/education/widgets/course-sidebar';
import { useAppLayout } from '~/domains/global/widgets/layout';
import { MarkdownRenderer } from '~/domains/global/widgets/markdown-renderer';
import { PageLoader } from '~/shared/ui/common/page-loader';
import { Container } from '~/shared/ui/primitives/container';
import { Skeleton } from '~/shared/ui/primitives/skeleton';

const VideoPlayer = lazy(() =>
  import('~/shared/ui/common/video-player').then((module) => ({ default: module.VideoPlayer })),
);

export const Route = createFileRoute('/(education)/_guard/courses_/$course_/lessons_/$lesson')({
  component: RouteComponent,
  pendingComponent: () => <PageLoader type='layout' />,
  loader: async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  },
});

function RouteComponent() {
  const { t } = useLingui();
  const { lesson } = Route.useParams();
  const { sidebar, setSidebar } = useAppLayout();

  useEffect(() => {
    if (!sidebar) {
      setSidebar(<CourseSidebar />);
    }

    return () => {
      setSidebar(null);
    };
  }, [setSidebar]);

  return (
    <Container size='md' title={t`Урок ${lesson}`}>
      <Suspense fallback={<Skeleton className='aspect-video w-full rounded-md' />}>
        <VideoPlayer
          title={t`Урок ${lesson}`}
          src='https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
          chapters={[
            /* eslint-disable lingui/no-unlocalized-strings */ {
              startTime: 0,
              endTime: 120,
              text: 'Глава 1: Введение',
            },
            { startTime: 120, endTime: 400, text: 'Глава 2: Основная часть' },
            { startTime: 400, endTime: 596, text: 'Глава 3: Заключение' },
          ]}
        />
      </Suspense>
      <MarkdownRenderer />
    </Container>
  );
}
