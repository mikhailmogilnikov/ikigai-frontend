import { Trans, useLingui } from '@lingui/react/macro';
import { useQueryClient } from '@tanstack/react-query';
import { useRef } from 'react';
import { toast } from 'sonner';

import { rqClient } from '~/shared/api';
import {
  AdaptiveModal,
  AdaptiveModalContent,
  AdaptiveModalFooter,
  AdaptiveModalHeader,
} from '~/shared/ui/overlays/adaptive-modal';
import { Avatar } from '~/shared/ui/primitives/avatar';
import { Button } from '~/shared/ui/primitives/button/button';
import { Flex } from '~/shared/ui/primitives/flex';
import { Typo } from '~/shared/ui/primitives/typo';

interface ChangeAvatarModalProps {
  open: boolean;
  onOpenChange: () => void;
}

export function ChangeAvatarModal({ open, onOpenChange }: ChangeAvatarModalProps) {
  const queryClient = useQueryClient();
  const { t } = useLingui();
  const { data } = rqClient.useQuery('get', '/users/me');

  const { mutate: updateAvatar, isPending } = rqClient.useMutation('patch', '/auth/upload-avatar', {
    onError: () => {
      toast.error(t`Не удалось обновить аватар`);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(rqClient.queryOptions('get', '/users/me'));
      toast.success(t`Аватар успешно обновлен`);
    },
  });

  const { mutate: deleteAvatar, isPending: isDeleting } = rqClient.useMutation('delete', '/auth/delete-avatar', {
    onError: () => {
      toast.error(t`Не удалось удалить аватар`);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(rqClient.queryOptions('get', '/users/me'));
      toast.success(t`Аватар успешно удален`);
    },
  });

  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file && file.size <= 1024 * 1024) {
      const formData = new FormData();

      formData.append('file', file);

      updateAvatar({
        // @ts-expect-error TODO: fix this
        body: formData,
      });
    }
  };

  return (
    <AdaptiveModal open={open} onOpenChange={onOpenChange}>
      <AdaptiveModalHeader>
        <Trans>Изменить аватар</Trans>
      </AdaptiveModalHeader>
      <AdaptiveModalContent>
        <Avatar alt='avatar' src={data?.image_url} className='mx-auto my-8 aspect-square size-40' />
        <Typo className='text-center text-sm opacity-50'>
          <Trans>
            Максимальный размер файла 1 МБ. Поддерживаются форматы: JPG, PNG, GIF, WEBP. Рекомендуемое соотношение
            сторон изображения: 1/1.
          </Trans>
        </Typo>
      </AdaptiveModalContent>
      <AdaptiveModalFooter>
        <Flex col className='w-full'>
          <input
            type='file'
            accept='image/*'
            disabled={isPending}
            multiple={false}
            className='hidden'
            ref={inputRef}
            onChange={handleFileChange}
          />
          <Button
            color='primary'
            size='lg'
            className='w-full'
            onClick={() => inputRef.current?.click()}
            isLoading={isPending}
          >
            <Trans>Изменить</Trans>
          </Button>
          <Button
            variant='bordered'
            size='lg'
            className='w-full'
            isLoading={isDeleting}
            onClick={() => {
              deleteAvatar({});
            }}
            isDisabled={!data?.image_url}
          >
            <Trans>Удалить</Trans>
          </Button>
        </Flex>
      </AdaptiveModalFooter>
    </AdaptiveModal>
  );
}
