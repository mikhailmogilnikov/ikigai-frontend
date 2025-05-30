import { Trans, useLingui } from '@lingui/react/macro';
import { createFileRoute } from '@tanstack/react-router';

import { CourseModules } from '~/domains/admin/entities/module';
import { AddModuleButton } from '~/domains/admin/features/add-module/ui/ui/button';
import { EditCourseInfo } from '~/domains/admin/features/edit-course-info';
import { rqClient } from '~/shared/api';
import { PageLoader } from '~/shared/ui/common/page-loader';
import { Container } from '~/shared/ui/primitives/container';
import { Flex } from '~/shared/ui/primitives/flex';
import { Typo } from '~/shared/ui/primitives/typo';

export const Route = createFileRoute('/admin/_guard/courses_/$course')({
  component: RouteComponent,
  loader: ({ context: { queryClient }, params: { course } }) =>
    queryClient.ensureQueryData(
      rqClient.queryOptions('get', '/admin/courses/{courseId}', { params: { path: { courseId: course } } }),
    ),
  pendingComponent: () => <PageLoader type='layout' />,
});

function RouteComponent() {
  const { course } = Route.useParams();
  const { t } = useLingui();

  const { data } = rqClient.useSuspenseQuery('get', '/admin/courses/{courseId}', {
    params: { path: { courseId: course } },
  });

  return (
    <Container size='md' title={t`Курс` + ` ${data.id.toString()}`}>
      <Typo size='lg' weight='semibold' className='mt-2'>
        <Trans>Основная информация</Trans>
      </Typo>
      <EditCourseInfo course={data} />
      <Flex className='mt-12 items-center justify-between'>
        <Typo size='lg' weight='semibold' className=''>
          <Trans>Модули курса</Trans>
        </Typo>
        <AddModuleButton />
      </Flex>
      <CourseModules modules={data.modules} />
    </Container>
  );
}
