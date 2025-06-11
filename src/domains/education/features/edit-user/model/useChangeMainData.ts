import { zodResolver } from '@hookform/resolvers/zod';
import { useLingui } from '@lingui/react/macro';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { publicRqClient } from '~/shared/api/instance';

export const useChangeMainData = ({
  firstName,
  lastName,
  onSuccess,
}: {
  firstName: string;
  lastName: string;
  onSuccess?: () => void;
}) => {
  const { t } = useLingui();

  const changeMainDataFormSchema = z.object({
    first_name: z.string().min(1, t`Имя должно быть не менее 1 символа`),
    last_name: z.string().min(1, t`Фамилия должна быть не менее 1 символа`),
  });

  type ChangeMainDataFormSchema = z.infer<typeof changeMainDataFormSchema>;

  const form = useForm<ChangeMainDataFormSchema>({
    resolver: zodResolver(changeMainDataFormSchema),
    defaultValues: {
      first_name: firstName,
      last_name: lastName,
    },
  });

  const { mutate: changeMainDataMutation, isPending } = publicRqClient.useMutation(
    'patch',
    '/auth/update-current-user',
    {
      onError: () => {
        form.setError('last_name', {
          message: t`Проверьте введенные данные`,
        });
      },
      onSuccess: () => {
        form.reset();
        toast.success(t`Данные успешно изменены`);
        onSuccess?.();
      },
    },
  );

  function onSubmit(values: ChangeMainDataFormSchema) {
    changeMainDataMutation({
      body: values,
    });
  }

  return {
    form,
    onSubmit,
    isPending,
  };
};
