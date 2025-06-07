import { Trans, useLingui } from '@lingui/react/macro';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, UseFormWatch } from 'react-hook-form';
import { z } from 'zod';
import { useMemo } from 'react';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';
import { PiFloppyDiskBold } from 'react-icons/pi';

import { ApiComponents, rqClient } from '~/shared/api';
import { Input } from '~/shared/ui/primitives/input';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/shared/ui/primitives/form';
import { Textarea } from '~/shared/ui/primitives/textarea';
import { Button } from '~/shared/ui/primitives/button/button';
import { Switch } from '~/shared/ui/primitives/switch';

interface EditCourseInfoProps {
  course: ApiComponents['AdminCourseMainInfo'];
}

interface EditCourseInfoSchema {
  title: string;
  price: number;
  description: string;
  image_url: string;
  published: boolean;
}

export function EditCourseInfo({ course }: EditCourseInfoProps) {
  const { t } = useLingui();
  const queryClient = useQueryClient();
  const { course: courseId } = useParams({ from: '/admin/_guard/courses_/$course' });

  const { mutate: editCourseInfo, isPending } = rqClient.useMutation('patch', '/admin/courses/{courseId}', {
    onError: () => {
      toast.error(t`Не удалось изменить информацию о курсе`);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(
        rqClient.queryOptions('get', '/admin/courses/{courseId}', {
          params: { path: { courseId } },
        }),
      );
      await queryClient.invalidateQueries(rqClient.queryOptions('get', '/admin/courses'));

      toast.success(t`Информация о курсе успешно изменена`);
    },
  });

  const editCourseInfoSchema = useMemo(
    () =>
      z.object({
        title: z.string().min(1, { message: t`Название не может быть пустым` }),
        price: z.coerce.number().min(0, { message: t`Цена не может быть отрицательной` }),
        description: z.string().min(1, { message: t`Описание не может быть пустым` }),
        image_url: z
          .string()
          .min(1, { message: t`Изображение не может быть пустым` })
          .url({ message: t`Неверный URL` }),
        published: z.boolean(),
      }),
    [t],
  );

  const form = useForm<EditCourseInfoSchema>({
    resolver: zodResolver(editCourseInfoSchema),
    defaultValues: {
      title: course.title,
      price: course.price,
      description: course.description || '',
      image_url: course.image_url || '',
      published: course.published,
    },
  });

  function onSubmit(values: EditCourseInfoSchema) {
    editCourseInfo({
      body: values,
      params: { path: { courseId } },
    });
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
          name='price'
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <Trans>Цена за курс (₽)</Trans>
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
          name='image_url'
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <Trans>Ссылка на изображение</Trans>
              </FormLabel>
              <FormControl>
                <Input className='bg-default' {...field} />
              </FormControl>
              <FormDescription className='opacity-50'>
                <Trans>
                  Ссылка на изображение должна быть в формате URL. Например, https://example.com/image.jpg. Соотношение
                  сторон 3x2 (например: валидный размер картинки, чтобы ничего не обрезалось - 600x400 или 1200x800)
                </Trans>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <Trans>Описание</Trans>
              </FormLabel>
              <FormControl>
                <Textarea className='bg-default' {...field} rows={6} />
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
                <Trans>Опубликовать курс</Trans>
              </FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />
        <EditCourseSaveButton watch={form.watch} course={course} isPending={isPending} />
      </form>
    </Form>
  );
}

const EditCourseSaveButton = ({
  watch,
  course,
  isPending,
}: {
  watch: UseFormWatch<EditCourseInfoSchema>;
  course: ApiComponents['AdminCourseMainInfo'];
  isPending: boolean;
}) => {
  const formValues = watch();

  const { title, price, description, image_url, published } = course;

  const isDirty = useMemo(() => {
    return (
      title !== formValues.title ||
      price !== Number(formValues.price) ||
      description !== formValues.description ||
      image_url !== formValues.image_url ||
      published !== formValues.published
    );
  }, [title, price, description, image_url, published, formValues]);

  return (
    <Button type='submit' isDisabled={!isDirty} color='success' className='mt-4' isLoading={isPending}>
      <PiFloppyDiskBold />
      <Trans>Сохранить</Trans>
    </Button>
  );
};
