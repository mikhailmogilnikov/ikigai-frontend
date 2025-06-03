import { zodResolver } from '@hookform/resolvers/zod';
import { useLingui } from '@lingui/react/macro';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useSession } from '~/domains/global/entities/session';
import { publicRqClient } from '~/shared/api/instance';

export const useLogin = () => {
  const { t } = useLingui();
  const { login } = useSession();

  const loginFormSchema = z.object({
    email: z.string().email(t`Неверный формат почты`),
    password: z.string().min(8, t`Пароль должен быть не менее 8 символов`),
  });

  type LoginFormSchema = z.infer<typeof loginFormSchema>;

  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { mutate: loginMutation, isPending } = publicRqClient.useMutation('post', '/auth/login', {
    onError: () => {
      form.setError('password', {
        message: t`Неверный email или пароль`,
      });
    },
    onSuccess: (data) => {
      login({
        access_token: data.access_token,
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
