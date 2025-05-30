import { Trans, useLingui } from '@lingui/react/macro';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { ApiComponents } from '~/shared/api';
import { Input } from '~/shared/ui/primitives/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/shared/ui/primitives/form';
import { Textarea } from '~/shared/ui/primitives/textarea';
import { Button } from '~/shared/ui/primitives/button/button';
import { Switch } from '~/shared/ui/primitives/switch';

interface EditCourseInfoProps {
  course: ApiComponents['AdminCourseFull'];
}

export function EditCourseInfo({ course }: EditCourseInfoProps) {
  const { t } = useLingui();

  const editCourseInfoSchema = z.object({
    title: z.string().min(1, { message: t`Название не может быть пустым` }),
    price: z.coerce.number().min(0, { message: t`Цена не может быть отрицательной` }),
    description: z.string().min(1, { message: t`Описание не может быть пустым` }),
    image_url: z
      .string()
      .min(1, { message: t`Изображение не может быть пустым` })
      .url({ message: t`Неверный URL` }),
    is_published: z.boolean(),
  });

  type EditCourseInfoSchema = z.infer<typeof editCourseInfoSchema>;

  const form = useForm<EditCourseInfoSchema>({
    resolver: zodResolver(editCourseInfoSchema),
    defaultValues: {
      title: course.title,
      price: course.price,
      description: course.description,
      image_url: course.image_url,
      is_published: course.is_published,
    },
  });

  function onSubmit(values: EditCourseInfoSchema) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
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
                <Trans>Цена</Trans>
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
          name='is_published'
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
        <Button type='submit' color='success' className='mt-4'>
          <Trans>Сохранить</Trans>
        </Button>
      </form>
    </Form>
  );
}
