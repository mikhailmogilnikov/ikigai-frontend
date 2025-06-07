import { zodResolver } from '@hookform/resolvers/zod';
import { useLingui } from '@lingui/react/macro';
import { useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { publicRqClient } from '~/shared/api/instance';

export const useRegistration = () => {
  const { t } = useLingui();
  const navigate = useNavigate();

  const [isOtpInputModalOpen, setIsOtpInputModalOpen] = useState(false);
  const [otpErrorsCount, setOtpErrorsCount] = useState(0);

  const passwordSchema = z
    .string()
    .min(8, t`Пароль должен быть не менее 8 символов`)
    .regex(/[A-Z]/, t`Пароль должен содержать хотя бы одну заглавную букву`)
    .regex(/[a-z]/, t`Пароль должен содержать хотя бы одну строчную букву`)
    .regex(/[0-9]/, t`Пароль должен содержать хотя бы одну цифру`);

  const registrationFormSchema = z
    .object({
      first_name: z.string().min(1, t`Имя должно быть не менее 1 символа`),
      last_name: z.string().min(1, t`Фамилия должна быть не менее 1 символа`),
      email: z.string().email(t`Неверный формат почты`),
      password: passwordSchema,
      repeat_password: passwordSchema,
    })
    .refine((data) => data.password === data.repeat_password, {
      path: ['repeat_password'],
      message: t`Пароли не совпадают`,
    });

  type RegistrationFormSchema = z.infer<typeof registrationFormSchema>;

  const form = useForm<RegistrationFormSchema>({
    resolver: zodResolver(registrationFormSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      repeat_password: '',
    },
  });

  const { mutate: registrationMutation, isPending } = publicRqClient.useMutation('post', '/auth/register', {
    onError: () => {
      form.setError('password', {
        message: t`Неверный email или пароль`,
      });
    },
    onSuccess: () => {
      setIsOtpInputModalOpen(true);
    },
  });

  const { mutate: verifyOtpMutation, isPending: isVerifyOtpPending } = publicRqClient.useMutation(
    'post',
    '/auth/register/confirm',
    {
      onError: () => {
        setOtpErrorsCount((prev) => prev + 1);
      },
      onSuccess: () => {
        toast.success(t`Регистрация пройдена успешно! Используйте вашу почту и пароль для входа в систему.`, {
          duration: 5000,
        });
        setIsOtpInputModalOpen(false);
        void navigate({ to: '/auth/sign-in' });
      },
    },
  );

  function onSubmit(values: RegistrationFormSchema) {
    registrationMutation({
      body: values,
    });
  }

  function onOtpInputModalOpenChange() {
    setIsOtpInputModalOpen(!isOtpInputModalOpen);
  }

  function onOtpInputModalSubmit(code: string) {
    verifyOtpMutation({
      body: {
        code,
        email: form.getValues('email'),
      },
    });
  }

  return {
    form,
    onSubmit,
    isPending,
    isOtpInputModalOpen,
    onOtpInputModalOpenChange,
    onOtpInputModalSubmit,
    isVerifyOtpPending,
    otpErrorsCount,
  };
};
