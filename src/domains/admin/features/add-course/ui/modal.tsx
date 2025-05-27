import { Trans, useLingui } from '@lingui/react/macro';
import { useState } from 'react';

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

  const [title, setTitle] = useState('');

  const handleCreateCourse = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title) return;

    setTitle('');
    onOpenChange(false);
  };

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <form onSubmit={handleCreateCourse}>
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
          <Button color='primary' className='h-10 w-full rounded-xl' isDisabled={!title} type='submit'>
            <Trans>Добавить</Trans>
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
}
