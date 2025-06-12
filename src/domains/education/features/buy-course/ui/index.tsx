import { Trans, useLingui } from '@lingui/react/macro';
import { useNavigate } from '@tanstack/react-router';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';

import {
  AdaptiveModal,
  AdaptiveModalContent,
  AdaptiveModalFooter,
  AdaptiveModalHeader,
} from '~/shared/ui/overlays/adaptive-modal';
import { Typo } from '~/shared/ui/primitives/typo';
import { normalizePrice } from '~/shared/lib/utils/price/normalize-price';
import { Button } from '~/shared/ui/primitives/button/button';
import { Flex } from '~/shared/ui/primitives/flex';
import { Locale } from '~/domains/global/entities/i18n';
import { rqClient } from '~/shared/api';

import { useBuyCourseModal } from '../model/useBuyCourse';
import { pay } from '../lib/pay';

export function BuyCourseModal() {
  const { course, isOpen, close } = useBuyCourseModal();
  const { t, i18n } = useLingui();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: createPayment, isPending: isLoading } = rqClient.useMutation('post', '/transactions/pay', {
    onSuccess: (data) => {
      if (!course) return;
      if (!data.publicId || !data.amount || !data.currency || !data.email || !data.invoiceId || !data.accountId) return;

      pay(
        {
          language: i18n.locale as `${Locale}`,
          publicId: data.publicId,
          invoiceId: data.invoiceId,
          accountId: data.accountId,
          description: t`Курс` + ` "${course.title}"`,
          amount: data.amount,
          currency: data.currency,
          email: data.email,
        },
        {
          onSuccess: handleSuccess,
          onFail: handleFail,
          onComplete: handleComplete,
        },
      );
    },
  });

  const handleFail = () => {
    //
  };

  const handleComplete = () => {
    //
  };

  const handleSuccess = () => {
    void queryClient.invalidateQueries(rqClient.queryOptions('get', '/courses/store'));
    void queryClient.invalidateQueries(rqClient.queryOptions('get', '/courses/my-courses'));
    void queryClient.invalidateQueries(rqClient.queryOptions('get', '/transactions'));
    void queryClient.invalidateQueries(
      rqClient.queryOptions('get', '/courses/{courseId}', {
        params: { path: { courseId: course?.id.toString() ?? '' } },
      }),
    );
    toast.success(t`Курс успешно оплачен`);
    void navigate({ to: '/' });
    close();
  };

  const handleCreatePayment = () => {
    if (!course) return;
    createPayment({
      body: {
        course_id: course.id,
      },
    });
  };

  return (
    <AdaptiveModal open={isOpen} onOpenChange={close}>
      <AdaptiveModalHeader>
        <Trans>Покупка курса</Trans>
      </AdaptiveModalHeader>
      <AdaptiveModalContent>
        <Flex col className='bg-default mb-2 rounded-lg p-4'>
          <Typo>
            <span className='opacity-50'>
              <Trans>Название: </Trans>
            </span>
            <b>"{course?.title}"</b>
          </Typo>
          <Typo>
            <span className='opacity-50'>
              <Trans>Цена: </Trans>
            </span>
            <b>{normalizePrice(course?.price ?? 0)}</b>
          </Typo>
          <Typo>
            <span className='opacity-50'>
              <Trans>Доступ к материалу: </Trans>
            </span>
            <b>бессрочный</b>
          </Typo>
        </Flex>
      </AdaptiveModalContent>
      <AdaptiveModalFooter>
        <Button className='w-full' color='primary' onClick={handleCreatePayment} isLoading={isLoading}>
          <Trans>Перейти к оплате</Trans>
        </Button>
      </AdaptiveModalFooter>
    </AdaptiveModal>
  );
}
