import { Trans, useLingui } from '@lingui/react/macro';
import { createFileRoute } from '@tanstack/react-router';
import { lazy, Suspense } from 'react';
import { PiCaretDoubleLeftBold, PiCaretLeftBold, PiPencilSimpleBold } from 'react-icons/pi';

import { LessonTestsConfigurator } from '~/domains/admin/features/configure-lesson-tests';
import { DeleteLessonButton } from '~/domains/admin/features/delete-lesson';
import { EditLessonInfo } from '~/domains/admin/features/edit-lesson';
import { MarkdownRenderer } from '~/domains/global/widgets/markdown-renderer';
import { rqClient } from '~/shared/api';
import { Chip } from '~/shared/ui/primitives/chip';
import { Container } from '~/shared/ui/primitives/container';
import { Flex } from '~/shared/ui/primitives/flex';
import { Image } from '~/shared/ui/primitives/image';
import { LinkButton } from '~/shared/ui/primitives/link-button';
import { Skeleton } from '~/shared/ui/primitives/skeleton';
import { Typo } from '~/shared/ui/primitives/typo';

const VideoPlayer = lazy(() =>
  import('~/shared/ui/common/video-player').then((module) => ({ default: module.VideoPlayer })),
);

export const Route = createFileRoute('/admin/_guard/courses_/$course_/modules_/$module_/lessons_/$lesson')({
  component: RouteComponent,
  loader: ({ context: { queryClient }, params: { lesson } }) => {
    void queryClient.ensureQueryData(
      rqClient.queryOptions('get', '/admin/lessons/{lessonId}', {
        params: { path: { lessonId: lesson } },
      }),
    );
  },
});

function RouteComponent() {
  const { t } = useLingui();
  const { course, module, lesson } = Route.useParams();

  const { data: lessonData } = rqClient.useSuspenseQuery('get', '/admin/lessons/{lessonId}', {
    params: { path: { lessonId: lesson } },
  });

  return (
    <Container size='md' title={t`Урок ` + `"${lessonData.title}"`}>
      <Flex>
        <LinkButton to='/admin/courses/$course' params={{ course }} className='w-fit' size='sm'>
          <PiCaretDoubleLeftBold />
          <Trans>К курсу</Trans>
        </LinkButton>
        <LinkButton to='/admin/courses/$course/modules/$module' params={{ course, module }} className='w-fit' size='sm'>
          <PiCaretLeftBold />
          <Trans>К модулю</Trans>
        </LinkButton>
      </Flex>
      <Flex>
        {lessonData.video_url ? (
          <Suspense fallback={<Skeleton className='aspect-video w-full rounded-md' />}>
            <VideoPlayer
              key={`${lessonData.id.toString()}-${lessonData.video_url}`}
              title={lessonData.title}
              src={lessonData.video_url}
              poster={lessonData.poster_url ?? undefined}
              className='shrink-1 aspect-video w-full rounded-md'
            />
          </Suspense>
        ) : (
          <Flex className='bg-default shrink-1 aspect-video w-full items-center justify-center rounded-md text-center'>
            <Typo className='opacity-50'>
              <Trans>Добавьте ссылку на видео</Trans>
            </Typo>
          </Flex>
        )}

        {lessonData.poster_url ? (
          <Image
            src={lessonData.poster_url}
            alt={lessonData.title}
            className='shrink-1 aspect-video w-full overflow-hidden rounded-md'
          />
        ) : (
          <Flex className='bg-default shrink-1 aspect-video w-full items-center justify-center rounded-md text-center'>
            <Typo className='opacity-50'>
              <Trans>Добавьте ссылку на постер к видео</Trans>
            </Typo>
          </Flex>
        )}
      </Flex>

      <Chip className='w-fit px-4'>
        <Trans>Количество тестов:</Trans> {lessonData.tests.length}
      </Chip>

      <Typo size='lg' weight='semibold' className='mt-4'>
        <Trans>Основная информация</Trans>
      </Typo>

      <EditLessonInfo lesson={lessonData} />

      <Flex className='mt-12 items-center justify-between'>
        <Typo size='lg' weight='semibold' className=''>
          <Trans>Текстовый контент урока</Trans>
        </Typo>
        <LinkButton
          to='/admin/courses/$course/modules/$module/lessons/$lesson/edit'
          params={{ course, module, lesson }}
          className='w-fit'
          size='sm'
        >
          <PiPencilSimpleBold />
          <Trans>Редактировать</Trans>
        </LinkButton>
      </Flex>

      <MarkdownRenderer content={lessonData.content} />

      <LessonTestsConfigurator testsData={lessonData.tests} lessonId={lesson} />

      <DeleteLessonButton className='mb-4' lessonId={lesson} moduleId={module} courseId={course} />
    </Container>
  );
}
