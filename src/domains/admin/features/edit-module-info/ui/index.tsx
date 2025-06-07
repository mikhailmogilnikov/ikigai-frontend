import { Trans, useLingui } from '@lingui/react/macro';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, UseFormWatch } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { PiFloppyDiskBold } from 'react-icons/pi';

import { ApiComponents, rqClient } from '~/shared/api';
import { Input } from '~/shared/ui/primitives/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/shared/ui/primitives/form';
import { Button } from '~/shared/ui/primitives/button/button';
import { Switch } from '~/shared/ui/primitives/switch';

interface EditModuleInfoProps {
  module: ApiComponents['AdminModule'];
}

interface EditModuleInfoSchema {
  title: string;
  published: boolean;
}

export function EditModuleInfo({ module }: EditModuleInfoProps) {
  const { t } = useLingui();
  const queryClient = useQueryClient();

  const editModuleInfoSchema = z.object({
    title: z.string().min(1, { message: t`Название не может быть пустым` }),
    published: z.boolean(),
  });

  const form = useForm<EditModuleInfoSchema>({
    resolver: zodResolver(editModuleInfoSchema),
    defaultValues: {
      title: module.title,
      published: module.published,
    },
  });

  const { mutate: updateModule, isPending } = rqClient.useMutation('patch', '/admin/modules/{moduleId}', {
    onError: () => {
      toast.error(t`Не удалось обновить информацию о модуле`);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(
        rqClient.queryOptions('get', '/admin/modules/{moduleId}', {
          params: { path: { moduleId: module.id.toString() } },
        }),
      );
      await queryClient.invalidateQueries(
        rqClient.queryOptions('get', '/admin/courses/{courseId}/modules', {
          params: { path: { courseId: module.course_id.toString() } },
        }),
      );
      toast.success(t`Информация о модуле успешно обновлена`);
    },
  });

  function onSubmit(values: EditModuleInfoSchema) {
    updateModule({ body: values, params: { path: { moduleId: module.id.toString() } } });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4'>
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <Trans>Название</Trans>
              </FormLabel>
              <FormControl>
                <Input className='bg-default' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='published'
          render={({ field }) => (
            <FormItem className='flex items-center gap-2'>
              <FormControl className=''>
                <Switch checked={field.value} onCheckedChange={field.onChange} className='mt-1.5' />
              </FormControl>
              <FormLabel>
                <Trans>Опубликовать модуль</Trans>
              </FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />
        <EditModuleSaveButton watch={form.watch} module={module} isPending={isPending} />
      </form>
    </Form>
  );
}

const EditModuleSaveButton = ({
  watch,
  module,
  isPending,
}: {
  watch: UseFormWatch<EditModuleInfoSchema>;
  module: ApiComponents['AdminModule'];
  isPending: boolean;
}) => {
  const formValues = watch();

  const { title, published } = module;

  const isDirty = useMemo(() => {
    return title !== formValues.title || published !== formValues.published;
  }, [title, published, formValues]);

  return (
    <Button type='submit' isDisabled={!isDirty} color='success' className='mt-4' isLoading={isPending}>
      <PiFloppyDiskBold />
      <Trans>Сохранить</Trans>
    </Button>
  );
};
