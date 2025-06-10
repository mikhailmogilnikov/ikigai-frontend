import { Trans } from '@lingui/react/macro';
import { Link } from '@tanstack/react-router';

import { Button } from '~/shared/ui/primitives/button/button';
import { Form, FormField, FormLabel, FormControl, FormItem, FormMessage } from '~/shared/ui/primitives/form';
import { cn } from '~/shared/lib/utils';
import { Typo } from '~/shared/ui/primitives/typo';
import { InputPassword } from '~/shared/ui/primitives/input';

import { useNewPassword } from '../model/useNewPassword';

export function NewPasswordForm({ className }: { className?: string }) {
  const { form, onSubmit, isPending } = useNewPassword();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn('flex w-full flex-col gap-4', className)}>
        <Typo className='mb-2 text-center text-xl font-semibold'>
          <Trans>Восстановление пароля</Trans>
        </Typo>

        <FormField
          name='new_password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <Trans>Новый пароль</Trans>
              </FormLabel>

              <FormControl>
                <InputPassword {...field} autoComplete='new-password' className='bg-default' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name='repeat_new_password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <Trans>Повторите новый пароль</Trans>
              </FormLabel>
              <FormControl>
                <InputPassword {...field} autoComplete='new-password' className='bg-default' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button color='inverse' type='submit' isLoading={isPending} className='mt-2'>
          <Trans>Восстановить пароль</Trans>
        </Button>
      </form>
      <Typo className='text-muted-foreground mx-auto mt-4 text-sm'>
        <Link className='text-sm font-medium hover:underline' to='/auth/sign-in'>
          <Trans>Вернуться на страницу входа</Trans>
        </Link>
      </Typo>
    </Form>
  );
}
