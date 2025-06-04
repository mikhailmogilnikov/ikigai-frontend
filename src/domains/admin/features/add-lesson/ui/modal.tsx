import { Trans, useLingui } from '@lingui/react/macro';
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';
import { useState } from 'react';
import { toast } from 'sonner';

import { rqClient } from '~/shared/api';
import { Modal, ModalContent, ModalFooter, ModalHeader } from '~/shared/ui/overlays/modal';
import { Button } from '~/shared/ui/primitives/button/button';
import { Flex } from '~/shared/ui/primitives/flex';
import { Input, InputLabel } from '~/shared/ui/primitives/input';

interface AddLessonModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddLessonModal({ open, onOpenChange }: AddLessonModalProps) {
  const { t } = useLingui();
  const queryClient = useQueryClient();
  const { module } = useParams({ from: '/admin/_guard/courses_/$course_/modules_/$module' });

  const [title, setTitle] = useState('');

  const { mutate: createLesson, isPending } = rqClient.useMutation('post', '/admin/modules/{moduleId}/lessons', {
    onError: () => {
      toast.error(t`Не удалось добавить урок "${title}"`);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(
        rqClient.queryOptions('get', '/admin/modules/{moduleId}/lessons', {
          params: { path: { moduleId: module } },
        }),
      );
      await queryClient.invalidateQueries(rqClient.queryOptions('get', '/admin/courses'));

      toast.success(t`Урок "${title}" успешно добавлен`);
      setTitle('');
      onOpenChange(false);
    },
  });

  const handleCreateCourse = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title) return;

    createLesson({ body: { title }, params: { path: { moduleId: module } } });
  };

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <form onSubmit={handleCreateCourse}>
        <ModalHeader>
          <Trans>Добавить урок</Trans>
        </ModalHeader>
        <ModalContent>
          <Flex col className='my-2'>
            <InputLabel htmlFor='title' label={t`Название урока`}>
              <Input
                autoFocus
                type='text'
                id='title'
                placeholder={t`Название урока`}
                className='bg-default'
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </InputLabel>
          </Flex>
        </ModalContent>
        <ModalFooter cancelButton>
          <Button
            isLoading={isPending}
            color='primary'
            className='h-10 w-full rounded-xl'
            isDisabled={!title}
            type='submit'
          >
            <Trans>Добавить</Trans>
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
}
