import { zodResolver } from '@hookform/resolvers/zod';
import { useLingui } from '@lingui/react/macro';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { publicRqClient } from '~/shared/api/instance';

export const useRecoverPassword = () => {
  const { t } = useLingui();

  const loginFormSchema = z.object({
    email: z.string().email(t`Неверный формат почты`),
  });

  type LoginFormSchema = z.infer<typeof loginFormSchema>;

  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
    },
  });

  const { mutate: loginMutation, isPending } = publicRqClient.useMutation('post', '/auth/recover-password', {
    onError: () => {
      form.setError('email', {
        message: t`Такой email не зарегистрирован`,
      });
    },
  });

  function onSubmit(values: LoginFormSchema) {
    loginMutation({
      body: values,
    });
  }

  return {
    form,
    onSubmit,
    isPending,
  };
};
