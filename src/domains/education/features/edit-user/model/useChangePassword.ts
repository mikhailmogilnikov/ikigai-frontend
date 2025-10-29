import { zodResolver } from '@hookform/resolvers/zod';
import { useLingui } from '@lingui/react/macro';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { rqClient } from '~/shared/api';

export const useChangePassword = ({ open, onSuccess }: { open: boolean; onSuccess?: () => void }) => {
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

  useEffect(() => {
    if (!open) {
      form.reset();
    }
  }, [open, form]);

  const { mutate: changePasswordMutation, isPending } = rqClient.useMutation('patch', '/auth/update-password', {
    onError: () => {
      form.setError('old_password', {
        message: t`Проверьте правильность старого пароля`,
      });
    },
    onSuccess: () => {
      toast.success(t`Пароль успешно изменен`);
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
