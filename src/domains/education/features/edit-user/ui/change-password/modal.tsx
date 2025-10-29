import { Trans, useLingui } from '@lingui/react/macro';
import { PiFloppyDiskBackBold } from 'react-icons/pi';

import {
  AdaptiveModal,
  AdaptiveModalContent,
  AdaptiveModalFooter,
  AdaptiveModalHeader,
} from '~/shared/ui/overlays/adaptive-modal';
import { Button } from '~/shared/ui/primitives/button/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/shared/ui/primitives/form';
import { Flex } from '~/shared/ui/primitives/flex';
import { InputPassword } from '~/shared/ui/primitives/input';

import { useChangePassword } from '../../model/useChangePassword';

interface ChangePasswordModalProps {
  open: boolean;
  onOpenChange: () => void;
}

export function ChangePasswordModal({ open, onOpenChange }: ChangePasswordModalProps) {
  const { t } = useLingui();
  const { form, onSubmit, isPending } = useChangePassword({ open, onSuccess: onOpenChange });

  return (
    <AdaptiveModal open={open} onOpenChange={onOpenChange}>
      <AdaptiveModalHeader>
        <Trans>Сменить пароль</Trans>
      </AdaptiveModalHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <AdaptiveModalContent>
            <Flex col className='mb-4 gap-4'>
              <FormField
                name='old_password'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>
                      <Trans>Старый пароль</Trans>
                    </FormLabel>
                    <FormControl>
                      <InputPassword
                        {...field}
                        autoComplete='off'
                        className='bg-default mt-1'
                        placeholder={t`Введите старый пароль`}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name='new_password'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>
                      <Trans>Новый пароль</Trans>
                    </FormLabel>
                    <FormControl>
                      <InputPassword
                        {...field}
                        autoComplete='new-password'
                        className='bg-default mt-1'
                        placeholder={t`Введите новый пароль`}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name='repeat_new_password'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>
                      <Trans>Подтвердите новый пароль</Trans>
                    </FormLabel>
                    <FormControl>
                      <InputPassword
                        {...field}
                        autoComplete='new-password'
                        className='bg-default mt-1'
                        placeholder={t`Повторите новый пароль`}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Flex>
          </AdaptiveModalContent>
          <AdaptiveModalFooter>
            <Button color='success' size='lg' className='w-full' type='submit' isLoading={isPending}>
              <PiFloppyDiskBackBold />
              <Trans>Сменить пароль</Trans>
            </Button>
          </AdaptiveModalFooter>
        </form>
      </Form>
    </AdaptiveModal>
  );
}
