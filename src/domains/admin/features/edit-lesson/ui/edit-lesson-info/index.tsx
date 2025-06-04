/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */

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
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/shared/ui/primitives/form';
import { Button } from '~/shared/ui/primitives/button/button';
import { Switch } from '~/shared/ui/primitives/switch';

interface EditLessonInfoProps {
  lesson: ApiComponents['AdminLesson'];
}

interface EditLessonInfoSchema {
  title: string;
  video_url: string | null;
  poster_url: string | null;
  is_published: boolean;
}

export function EditLessonInfo({ lesson }: EditLessonInfoProps) {
  const { t } = useLingui();
  const queryClient = useQueryClient();

  const editLessonInfoSchema = z.object({
    title: z.string().min(1, { message: t`Название не может быть пустым` }),
    video_url: z
      .string()
      .url({ message: t`Введите корректную ссылку` })
      .or(z.literal(''))
      .transform((val) => (val === '' ? null : val))
      .nullable(),
    poster_url: z
      .string()
      .url({ message: t`Введите корректную ссылку` })
      .or(z.literal(''))
      .transform((val) => (val === '' ? null : val))
      .nullable(),
    is_published: z.boolean(),
  });

  const form = useForm<EditLessonInfoSchema>({
    resolver: zodResolver(editLessonInfoSchema),
    defaultValues: {
      title: lesson.title,
      video_url: lesson.video_url ?? '',
      poster_url: lesson.poster_url ?? '',
      is_published: lesson.is_published,
    },
  });

  const { mutate: updateLesson, isPending } = rqClient.useMutation('patch', '/admin/lessons/{lessonId}', {
    onError: () => {
      toast.error(t`Не удалось обновить информацию о уроке`);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(
        rqClient.queryOptions('get', '/admin/lessons/{lessonId}', {
          params: { path: { lessonId: lesson.id.toString() } },
        }),
      );
      await queryClient.invalidateQueries(
        rqClient.queryOptions('get', '/admin/modules/{moduleId}/lessons', {
          params: { path: { moduleId: lesson.module_id.toString() } },
        }),
      );

      toast.success(t`Информация о уроке успешно обновлена`);
    },
  });

  function onSubmit(values: EditLessonInfoSchema) {
    updateLesson({ body: values, params: { path: { lessonId: lesson.id.toString() } } });
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
                <Trans>Название урока</Trans>
              </FormLabel>
              <FormControl>
                <Input className='bg-default' placeholder={t`Название урока`} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='video_url'
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <Trans>Ссылка на видео (необязательно)</Trans>
              </FormLabel>
              <FormControl>
                <Input
                  className='bg-default'
                  {...field}
                  value={field.value ?? ''}
                  placeholder={t`https://example.com/video.mp4`}
                  onChange={(e) => {
                    field.onChange(e.target.value || null);
                  }}
                />
              </FormControl>
              <FormDescription className='opacity-50'>
                <Trans>Соотношение сторон 16x9</Trans>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='poster_url'
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <Trans>Ссылка на постер (необязательно)</Trans>
              </FormLabel>
              <FormControl>
                <Input
                  className='bg-default'
                  {...field}
                  value={field.value ?? ''}
                  placeholder={t`https://example.com/poster.jpg`}
                  onChange={(e) => {
                    field.onChange(e.target.value || null);
                  }}
                />
              </FormControl>
              <FormDescription className='opacity-50'>
                <Trans>Соотношение сторон 16x9</Trans>
              </FormDescription>
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
                <Trans>Опубликовать урок</Trans>
              </FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />
        <EditLessonSaveButton watch={form.watch} lesson={lesson} isPending={isPending} />
      </form>
    </Form>
  );
}

const EditLessonSaveButton = ({
  watch,
  lesson,
  isPending,
}: {
  watch: UseFormWatch<EditLessonInfoSchema>;
  lesson: ApiComponents['AdminLesson'];
  isPending: boolean;
}) => {
  const formValues = watch();

  const { title, is_published, video_url, poster_url } = lesson;

  const isDirty = useMemo(() => {
    return (
      title !== formValues.title ||
      is_published !== formValues.is_published ||
      video_url !== (formValues.video_url || null) ||
      poster_url !== (formValues.poster_url || null)
    );
  }, [title, is_published, formValues, video_url, poster_url]);

  return (
    <Button type='submit' isDisabled={!isDirty} color='success' className='mt-4' isLoading={isPending}>
      <PiFloppyDiskBold />
      <Trans>Сохранить</Trans>
    </Button>
  );
};
