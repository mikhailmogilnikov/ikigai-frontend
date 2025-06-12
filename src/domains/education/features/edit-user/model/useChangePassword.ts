import { zodResolver } from '@hookform/resolvers/zod';
import { useLingui } from '@lingui/react/macro';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { rqClient } from '~/shared/api';

export const useChangePassword = (onSuccess?: () => void) => {
  const { t } = useLingui();

  const passwordSchema = z
    .string()
    .min(8, t`Пароль должен быть не менее 8 символов`)
    .regex(/[A-Z]/, t`Пароль должен содержать хотя бы одну заглавную букву`)
    .regex(/[a-z]/, t`Пароль должен содержать хотя бы одну строчную букву`)
    .regex(/[0-9]/, t`Пароль должен содержать хотя бы одну цифру`);

  const changePasswordFormSchema = z
    .object({
      old_password: z.string().min(1, t`Старый пароль обязателен`),
      new_password: passwordSchema,
      repeat_new_password: passwordSchema,
    })
    .refine((data) => data.new_password === data.repeat_new_password, {
      message: t`Пароли не совпадают`,
      path: ['repeat_new_password'],
    });

  type ChangePasswordFormSchema = z.infer<typeof changePasswordFormSchema>;

  const form = useForm<ChangePasswordFormSchema>({
    resolver: zodResolver(changePasswordFormSchema),
    defaultValues: {
      old_password: '',
      new_password: '',
      repeat_new_password: '',
    },
  });

  const { mutate: changePasswordMutation, isPending } = rqClient.useMutation('patch', '/auth/update-password', {
    onError: () => {
      form.setError('old_password', {
        message: t`Проверьте правильность старого пароля`,
      });
    },
    onSuccess: () => {
      toast.success(t`Пароль успешно изменен`);
      form.reset();
      onSuccess?.();
    },
  });

  function onSubmit(values: ChangePasswordFormSchema) {
    changePasswordMutation({
      body: values,
    });
  }

  return {
    form,
    onSubmit,
    isPending,
  };
};
