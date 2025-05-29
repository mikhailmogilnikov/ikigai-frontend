import { Trans, useLingui } from '@lingui/react/macro';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import { rqClient } from '~/shared/api';
import { Modal, ModalContent, ModalFooter, ModalHeader } from '~/shared/ui/overlays/modal';
import { Button } from '~/shared/ui/primitives/button/button';
import { Flex } from '~/shared/ui/primitives/flex';
import { Input, InputLabel } from '~/shared/ui/primitives/input';

interface AddCourseModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddCourseModal({ open, onOpenChange }: AddCourseModalProps) {
  const { t } = useLingui();
  const queryClient = useQueryClient();

  const [title, setTitle] = useState('');

  const { mutateAsync: createCourse, isPending } = rqClient.useMutation('post', '/admin/courses', {
    onSettled: async () => {
      await queryClient.invalidateQueries(rqClient.queryOptions('get', '/admin/courses'));
    },
  });

  const handleCreateCourse = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title) return;

    await createCourse({ body: { title } });

    setTitle('');
    onOpenChange(false);
  };

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <form
        onSubmit={(e) => {
          void handleCreateCourse(e);
        }}
      >
        <ModalHeader>
          <Trans>Добавить курс</Trans>
        </ModalHeader>
        <ModalContent>
          <Flex col className='my-2'>
            <InputLabel htmlFor='title' label={t`Название курса`}>
              <Input
                autoFocus
                type='text'
                id='title'
                placeholder={t`Название курса`}
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
