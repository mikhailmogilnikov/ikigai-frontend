import { zodResolver } from '@hookform/resolvers/zod';
import { useLingui } from '@lingui/react/macro';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { publicRqClient } from '~/shared/api/instance';

export const useNewPassword = () => {
  const { t } = useLingui();
  const navigate = useNavigate();
  const { verify } = useSearch({ from: '/auth/_guard/new-password' });

  const passwordSchema = z
    .string()
    .min(8, t`Пароль должен быть не менее 8 символов`)
    .regex(/[A-Z]/, t`Пароль должен содержать хотя бы одну заглавную букву`)
    .regex(/[a-z]/, t`Пароль должен содержать хотя бы одну строчную букву`)
    .regex(/[0-9]/, t`Пароль должен содержать хотя бы одну цифру`);

  const newPasswordFormSchema = z
    .object({
      new_password: passwordSchema,
      repeat_new_password: passwordSchema,
    })
    .refine((data) => data.new_password === data.repeat_new_password, {
      path: ['repeat_new_password'],
      message: t`Пароли не совпадают`,
    });

  type NewPasswordFormSchema = z.infer<typeof newPasswordFormSchema>;

  const form = useForm<NewPasswordFormSchema>({
    resolver: zodResolver(newPasswordFormSchema),
    defaultValues: {
      new_password: '',
      repeat_new_password: '',
    },
  });

  const { mutate: newPasswordMutation, isPending } = publicRqClient.useMutation(
    'post',
    '/auth/recover-password/change-password',
    {
      onError: () => {
        form.setError('repeat_new_password', {
          message: t`Произошла непредвиденная ошибка. Попробуйте позже.`,
        });
      },
      onSuccess: () => {
        toast.success(t`Пароль изменен успешно! Используйте вашу почту и пароль для входа в систему.`, {
          duration: 5000,
        });
        void navigate({ to: '/auth/sign-in' });
      },
    },
  );

  function onSubmit(data: NewPasswordFormSchema) {
    newPasswordMutation({
      body: { ...data, verify },
    });
  }

  return {
    form,
    onSubmit,
    isPending,
  };
};
