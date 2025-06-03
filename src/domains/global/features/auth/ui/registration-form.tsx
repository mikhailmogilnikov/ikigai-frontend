import { Trans, useLingui } from '@lingui/react/macro';
import { Link } from '@tanstack/react-router';

import { Input } from '~/shared/ui/primitives/input';
import { Button } from '~/shared/ui/primitives/button/button';
import { Form, FormField, FormLabel, FormControl, FormItem, FormMessage } from '~/shared/ui/primitives/form';
import { cn } from '~/shared/lib/utils';
import { Flex } from '~/shared/ui/primitives/flex';
import { Typo } from '~/shared/ui/primitives/typo';

import { useRegistration } from '../model/useRegistration';

export function RegistrationForm({ className }: { className?: string }) {
  const { t } = useLingui();
  const { form, onSubmit, isPending } = useRegistration();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn('flex w-full flex-col gap-4', className)}>
        <Typo className='mb-2 text-center text-xl font-semibold'>
          <Trans>Регистрация</Trans>
        </Typo>

        <Flex>
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
              <FormLabel>
                <Trans>Пароль</Trans>
              </FormLabel>

              <FormControl>
                <Input
                  {...field}
                  autoComplete='new-password'
                  type='password'
                  className='bg-default'
                  placeholder={`********`}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name='repeat_password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <Trans>Повторите пароль</Trans>
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  autoComplete='new-password'
                  type='password'
                  className='bg-default'
                  placeholder={`********`}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button color='inverse' type='submit' isLoading={isPending} className='mt-2'>
          <Trans>Зарегистрироваться</Trans>
        </Button>
      </form>
      <Typo className='text-muted-foreground mx-auto mt-4 text-sm'>
        <Trans>
          <span className='opacity-50'>Уже есть аккаунт? </span>
          <Link className='text-sm font-medium hover:underline' to='/auth/sign-in'>
            Войти
          </Link>{' '}
        </Trans>
      </Typo>
    </Form>
  );
}
