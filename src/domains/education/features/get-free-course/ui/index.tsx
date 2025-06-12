import { useLingui } from '@lingui/react/macro';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { rqClient } from '~/shared/api';
import { Button } from '~/shared/ui/primitives/button/button';

interface GetFreeCourseButtonProps {
  children: React.ReactNode;
  courseId: number;
}

export function GetFreeCourseButton({ children, courseId }: GetFreeCourseButtonProps) {
  const queryClient = useQueryClient();
  const { t } = useLingui();

  const { mutate: getFreeCourseMutation, isPending } = rqClient.useMutation('post', '/courses/{courseId}/free', {
    onError: () => {
      toast.error(t`Не удалось получить бесплатный курс`);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries(rqClient.queryOptions('get', '/courses/my-courses'));
      void queryClient.invalidateQueries(rqClient.queryOptions('get', '/courses/store'));
      void queryClient.invalidateQueries(
        rqClient.queryOptions('get', '/courses/{courseId}', { params: { path: { courseId: courseId.toString() } } }),
      );
      toast.success(t`Курс добавлен в вашу коллекцию`);
    },
  });

  return (
    <Button
      className='w-full'
      color='primary'
      onClick={() => {
        getFreeCourseMutation({ params: { path: { courseId } } });
      }}
      isLoading={isPending}
    >
      {children}
    </Button>
  );
}
