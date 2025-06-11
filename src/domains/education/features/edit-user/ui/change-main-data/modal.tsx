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
import { Input } from '~/shared/ui/primitives/input';

import { useChangeMainData } from '../../model/useChangeMainData';

interface ChangeMainDataModalProps {
  open: boolean;
  onOpenChange: () => void;
  firstName: string;
  lastName: string;
}

export function ChangeMainDataModal({ open, onOpenChange, firstName, lastName }: ChangeMainDataModalProps) {
  const { t } = useLingui();
  const { form, onSubmit, isPending } = useChangeMainData({ firstName, lastName, onSuccess: onOpenChange });

  return (
    <AdaptiveModal open={open} onOpenChange={onOpenChange}>
      <AdaptiveModalHeader>
        <Trans>Редактировать основные данные</Trans>
      </AdaptiveModalHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <AdaptiveModalContent>
            <Flex col className='mb-4 gap-4'>
              <FormField
                name='first_name'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>
                      <Trans>Имя</Trans>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} autoComplete='name' className='bg-default mt-1' placeholder={t`Имя`} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name='last_name'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>
                      <Trans>Фамилия</Trans>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        autoComplete='additional-name'
                        className='bg-default mt-1'
                        placeholder={t`Фамилия`}
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
              <Trans>Сохранить</Trans>
            </Button>
          </AdaptiveModalFooter>
        </form>
      </Form>
    </AdaptiveModal>
  );
}
