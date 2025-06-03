import { createFileRoute } from '@tanstack/react-router';
import { Trans, useLingui } from '@lingui/react/macro';
import { PiCaretLeftBold } from 'react-icons/pi';

import { Container } from '~/shared/ui/primitives/container';
import { LinkButton } from '~/shared/ui/primitives/link-button';
import { EditModuleInfo } from '~/domains/admin/features/edit-module-info';
import { Typo } from '~/shared/ui/primitives/typo';
import { Flex } from '~/shared/ui/primitives/flex';
import { AddLessonButton } from '~/domains/admin/features/add-lesson';
import { rqClient } from '~/shared/api';
import { ModuleLessons } from '~/domains/admin/entities/lesson';

export const Route = createFileRoute('/admin/_guard/courses_/$course_/modules_/$module')({
  component: RouteComponent,
  loader: ({ context: { queryClient }, params: { module } }) => {
    void queryClient.ensureQueryData(
      rqClient.queryOptions('get', '/admin/modules/{moduleId}', {
        params: { path: { moduleId: module } },
      }),
    );
    void queryClient.ensureQueryData(
      rqClient.queryOptions('get', '/admin/modules/{moduleId}/lessons', {
        params: { path: { moduleId: module } },
      }),
    );
  },
});

function RouteComponent() {
  const { course, module } = Route.useParams();
  const { t } = useLingui();

  const { data: moduleData } = rqClient.useSuspenseQuery('get', '/admin/modules/{moduleId}', {
    params: { path: { moduleId: module } },
  });
  const { data: lessonsData } = rqClient.useSuspenseQuery('get', '/admin/modules/{moduleId}/lessons', {
    params: { path: { moduleId: module } },
  });

  return (
    <Container size='md' title={t`Модуль ${module} курса ${course}`}>
      <LinkButton to='/admin/courses/$course' params={{ course }} className='w-fit' size='sm'>
        <PiCaretLeftBold />
        <Trans>Назад к курсу</Trans>
      </LinkButton>
      <Typo size='lg' weight='semibold' className='mt-4'>
        <Trans>Основная информация</Trans>
      </Typo>
      <EditModuleInfo module={moduleData} />
      <Flex className='mt-12 items-center justify-between'>
        <Typo size='lg' weight='semibold' className=''>
          <Trans>Уроки модуля</Trans>
        </Typo>
        <AddLessonButton />
      </Flex>
      <ModuleLessons lessons={lessonsData} />
    </Container>
  );
}
