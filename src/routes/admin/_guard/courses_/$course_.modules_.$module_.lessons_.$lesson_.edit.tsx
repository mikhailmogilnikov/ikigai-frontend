import { Trans, useLingui } from '@lingui/react/macro';
import { useQueryClient } from '@tanstack/react-query';
import { createFileRoute, useBlocker } from '@tanstack/react-router';
import { useState } from 'react';
import { PiCaretLeftBold, PiFloppyDiskBackBold } from 'react-icons/pi';
import { toast } from 'sonner';

import { EditLessonContent } from '~/domains/admin/features/edit-lesson/ui/edit-lesson-content';
import { rqClient } from '~/shared/api';
import { Button } from '~/shared/ui/primitives/button/button';
import { Container } from '~/shared/ui/primitives/container';
import { Flex } from '~/shared/ui/primitives/flex';
import { LinkButton } from '~/shared/ui/primitives/link-button';

export const Route = createFileRoute('/admin/_guard/courses_/$course_/modules_/$module_/lessons_/$lesson_/edit')({
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
  const queryClient = useQueryClient();

  const { data: lessonData } = rqClient.useSuspenseQuery('get', '/admin/lessons/{lessonId}', {
    params: { path: { lessonId: lesson } },
  });

  const [content, setContent] = useState<string | undefined>(lessonData.content);

  const { mutate: updateLesson, isPending } = rqClient.useMutation('patch', '/admin/lessons/{lessonId}', {
    onError: () => {
      toast.error(t`Не удалось сохранить изменения`);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries(
        rqClient.queryOptions('get', '/admin/lessons/{lessonId}', {
          params: { path: { lessonId: lesson } },
        }),
      );

      toast.success(t`Изменения сохранены`);
    },
  });

  useBlocker({
    shouldBlockFn: () => {
      if (content === lessonData.content) return false;

      const shouldLeave = confirm(t`Вы уверены, что хотите покинуть страницу? Несохраненные изменения будут потеряны.`);

      return !shouldLeave;
    },
  });

  const handleSave = () => {
    updateLesson({
      params: {
        path: { lessonId: lesson },
      },
      body: {
        content: content ?? '',
      },
    });
  };

  return (
    <Container size='lg' title={t`Редактирование контента урока ` + `"${lessonData.title}"`}>
      <Flex>
        <LinkButton
          to='/admin/courses/$course/modules/$module/lessons/$lesson'
          params={{ course, module, lesson }}
          className='w-fit'
          size='sm'
        >
          <PiCaretLeftBold />
          <Trans>К уроку</Trans>
        </LinkButton>

        <Button
          className='min-w-50 w-fit'
          size='sm'
          color='success'
          isDisabled={content === lessonData.content}
          onClick={handleSave}
          isLoading={isPending}
        >
          <PiFloppyDiskBackBold />
          <Trans>Сохранить изменения</Trans>
        </Button>
      </Flex>

      <EditLessonContent content={content ?? ''} onChange={setContent} />
    </Container>
  );
}
