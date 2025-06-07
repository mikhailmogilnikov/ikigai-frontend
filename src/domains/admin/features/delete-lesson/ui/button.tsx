import { Trans, useLingui } from '@lingui/react/macro';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { PiTrashBold } from 'react-icons/pi';
import { toast } from 'sonner';
import { useState } from 'react';

import { rqClient } from '~/shared/api';
import { Button } from '~/shared/ui/primitives/button/button';
import { AlertModal } from '~/shared/ui/overlays/alert-modal';

export function DeleteLessonButton({
  className,
  lessonId,
  moduleId,
  courseId,
}: {
  className?: string;
  lessonId: string;
  moduleId: string;
  courseId: string;
}) {
  const { t } = useLingui();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [isOpen, setIsOpen] = useState(false);

  const { mutate: deleteLesson, isPending } = rqClient.useMutation('delete', '/admin/lessons/{lessonId}', {
    onSuccess: () => {
      void queryClient.invalidateQueries(
        rqClient.queryOptions('get', '/admin/modules/{moduleId}/lessons', {
          params: {
            path: {
              moduleId,
            },
          },
        }),
      );
      toast.success(t`Урок удален`);
      setIsOpen(false);
      void navigate({
        to: '/admin/courses/$course/modules/$module',
        params: { course: courseId, module: moduleId },
      });
    },
  });

  const handleDelete = () => {
    deleteLesson({
      params: {
        path: {
          lessonId,
        },
      },
    });
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Button color='primary' className={className} onClick={handleOpen}>
        <PiTrashBold />
        <Trans>Удалить урок</Trans>
      </Button>
      <AlertModal
        open={isOpen}
        confirmColor='danger'
        description={t`Вы уверены, что хотите удалить урок? Это действие необратимо.`}
        onOpenChange={handleClose}
        onConfirm={handleDelete}
        isConfirmLoading={isPending}
      />
    </>
  );
}
