import { Trans, useLingui } from '@lingui/react/macro';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { PiTrashBold } from 'react-icons/pi';
import { toast } from 'sonner';
import { useState } from 'react';

import { rqClient } from '~/shared/api';
import { Button } from '~/shared/ui/primitives/button/button';
import { AlertModal } from '~/shared/ui/overlays/alert-modal';

export function DeleteModuleButton({
  className,
  moduleId,
  courseId,
}: {
  className?: string;
  moduleId: string;
  courseId: string;
}) {
  const { t } = useLingui();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [isOpen, setIsOpen] = useState(false);

  const { mutate: deleteModule, isPending } = rqClient.useMutation('delete', '/admin/modules/{moduleId}', {
    onSuccess: () => {
      void queryClient.invalidateQueries(
        rqClient.queryOptions('get', '/admin/courses/{courseId}/modules', {
          params: {
            path: {
              courseId,
            },
          },
        }),
      );
      toast.success(t`Модуль удален`);
      setIsOpen(false);
      void navigate({
        to: '/admin/courses/$course',
        params: { course: courseId },
      });
    },
  });

  const handleDelete = () => {
    deleteModule({
      params: {
        path: {
          moduleId,
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
        <Trans>Удалить модуль</Trans>
      </Button>
      <AlertModal
        open={isOpen}
        confirmColor='danger'
        description={t`Вы уверены, что хотите удалить модуль? Все уроки, которые входят в этот модуль, также будут удалены. Это действие необратимо.`}
        onOpenChange={handleClose}
        onConfirm={handleDelete}
        isConfirmLoading={isPending}
      />
    </>
  );
}
