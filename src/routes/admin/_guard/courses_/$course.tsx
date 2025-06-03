import { Trans, useLingui } from '@lingui/react/macro';
import { createFileRoute } from '@tanstack/react-router';

import { CourseModules } from '~/domains/admin/entities/module';
import { AddModuleButton } from '~/domains/admin/features/add-module/ui/button';
import { EditCourseInfo } from '~/domains/admin/features/edit-course-info';
import { rqClient } from '~/shared/api';
import { errorHandler } from '~/shared/lib/services/error-handler';
import { Container } from '~/shared/ui/primitives/container';
import { Flex } from '~/shared/ui/primitives/flex';
import { Image } from '~/shared/ui/primitives/image';
import { Typo } from '~/shared/ui/primitives/typo';

export const Route = createFileRoute('/admin/_guard/courses_/$course')({
  component: RouteComponent,
  loader: ({ context: { queryClient }, params: { course } }) => {
    void queryClient.ensureQueryData(
      rqClient.queryOptions('get', '/admin/courses/{courseId}', { params: { path: { courseId: course } } }),
    );
    void queryClient.ensureQueryData(
      rqClient.queryOptions('get', '/admin/courses/{courseId}/modules', { params: { path: { courseId: course } } }),
    );
  },
  errorComponent: ({ error }) => {
    const errorType = errorHandler.handle(error);

    switch (errorType) {
      case '401_UNAUTHORIZED':
        return <>s</>;
    }
  },
});

function RouteComponent() {
  const { course } = Route.useParams();
  const { t } = useLingui();

  const { data } = rqClient.useSuspenseQuery('get', '/admin/courses/{courseId}', {
    params: { path: { courseId: course } },
  });

  const { data: modules } = rqClient.useSuspenseQuery('get', '/admin/courses/{courseId}/modules', {
    params: { path: { courseId: course } },
  });

  return (
    <Container size='md' title={t`Курс` + ` ${data.id.toString()}`}>
      <Image
        src={data.image_url}
        alt={data.title}
        className='max-w-100 aspect-[3/2] w-full overflow-hidden rounded-lg'
      />
      <Typo size='lg' weight='semibold' className='mt-4'>
        <Trans>Основная информация</Trans>
      </Typo>
      <EditCourseInfo course={data} />
      <Flex className='mt-12 items-center justify-between'>
        <Typo size='lg' weight='semibold' className=''>
          <Trans>Модули курса</Trans>
        </Typo>
        <AddModuleButton />
      </Flex>
      <CourseModules modules={modules} />
    </Container>
  );
}
