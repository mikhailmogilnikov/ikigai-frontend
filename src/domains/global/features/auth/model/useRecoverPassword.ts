import { zodResolver } from '@hookform/resolvers/zod';
import { useLingui } from '@lingui/react/macro';
import { useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { publicRqClient } from '~/shared/api/instance';

export const useRecoverPassword = () => {
  const { t } = useLingui();
  const navigate = useNavigate();

  const recoverPasswordFormSchema = z.object({
    email: z.string().email(t`Неверный формат почты`),
  });

  type RecoverPasswordFormSchema = z.infer<typeof recoverPasswordFormSchema>;

  const form = useForm<RecoverPasswordFormSchema>({
    resolver: zodResolver(recoverPasswordFormSchema),
    defaultValues: {
      email: '',
    },
  });

  const { mutate: recoverPasswordMutation, isPending } = publicRqClient.useMutation('post', '/auth/recover-password', {
    onError: () => {
      form.setError('email', {
        message: t`Такой email не зарегистрирован`,
      });
    },
    onSuccess: () => {
      toast.success(t`Письмо для восстановления пароля отправлено на указанную почту`, {
        duration: 5000,
      });
      void navigate({ to: '/auth/sign-in' });
    },
  });

  function onSubmit(values: RecoverPasswordFormSchema) {
    recoverPasswordMutation({
      body: values,
    });
  }

  return {
    form,
    onSubmit,
    isPending,
  };
};
