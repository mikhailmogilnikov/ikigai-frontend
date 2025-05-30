import { Trans, useLingui } from '@lingui/react/macro';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'sonner';

import { rqClient } from '~/shared/api';
import { Modal, ModalContent, ModalFooter, ModalHeader } from '~/shared/ui/overlays/modal';
import { Button } from '~/shared/ui/primitives/button/button';
import { Flex } from '~/shared/ui/primitives/flex';
import { Input, InputLabel } from '~/shared/ui/primitives/input';

interface AddModuleModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddModuleModal({ open, onOpenChange }: AddModuleModalProps) {
  const { t } = useLingui();
  const queryClient = useQueryClient();

  const [title, setTitle] = useState('');

  const { mutate: createCourse, isPending } = rqClient.useMutation('post', '/admin/courses', {
    onError: () => {
      toast.error(t`Не удалось добавить модуль "${title}"`);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(rqClient.queryOptions('get', '/admin/courses'));

      toast.success(t`Модуль "${title}" успешно добавлен`);
      setTitle('');
      onOpenChange(false);
    },
  });

  const handleCreateCourse = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title) return;

    createCourse({ body: { title } });
  };

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <form onSubmit={handleCreateCourse}>
        <ModalHeader>
          <Trans>Добавить модуль</Trans>
        </ModalHeader>
        <ModalContent>
          <Flex col className='my-2'>
            <InputLabel htmlFor='title' label={t`Название модуля`}>
              <Input
                autoFocus
                type='text'
                id='title'
                placeholder={t`Название модуля`}
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
