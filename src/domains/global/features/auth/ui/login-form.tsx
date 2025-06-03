import { Trans } from '@lingui/react/macro';
import { Link } from '@tanstack/react-router';

import { Input } from '~/shared/ui/primitives/input';
import { Button } from '~/shared/ui/primitives/button/button';
import { Form, FormField, FormLabel, FormControl, FormItem, FormMessage } from '~/shared/ui/primitives/form';
import { cn } from '~/shared/lib/utils';
import { Flex } from '~/shared/ui/primitives/flex';
import { Typo } from '~/shared/ui/primitives/typo';

import { useLogin } from '../model/useLogin';

export function LoginForm({ className }: { className?: string }) {
  const { form, onSubmit, isPending } = useLogin();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn('flex w-full flex-col gap-4', className)}>
        <Typo className='mb-2 text-center text-xl font-semibold'>
          <Trans>Войти в аккаунт</Trans>
        </Typo>
        <FormField
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <Trans>Почта</Trans>
              </FormLabel>
              <FormControl>
                <Input {...field} autoComplete='email' className='bg-default mt-1' placeholder={`mail@example.com`} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name='password'
          render={({ field }) => (
            <FormItem>
              <Flex className='items-center justify-between'>
                <FormLabel>
                  <Trans>Пароль</Trans>
                </FormLabel>
                <Link className='text-sm font-medium hover:underline' to='/auth/recover-password'>
                  <Trans>Забыли пароль?</Trans>
                </Link>
              </Flex>

              <FormControl>
                <Input
                  {...field}
                  type='password'
                  autoComplete='current-password'
                  className='bg-default'
                  placeholder={`********`}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button color='inverse' type='submit' isLoading={isPending} className='mt-2'>
          <Trans>Войти</Trans>
        </Button>
      </form>
      <Typo className='text-muted-foreground mx-auto mt-4 text-sm'>
        <Trans>
          <span className='opacity-50'>Нет аккаунта? </span>
          <Link className='text-sm font-medium hover:underline' to='/auth/sign-up'>
            Зарегистрироваться
          </Link>{' '}
        </Trans>
      </Typo>
    </Form>
  );
}
