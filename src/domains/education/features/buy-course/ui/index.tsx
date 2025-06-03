import { Trans } from '@lingui/react/macro';

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

import { useBuyCourseModal } from '../model/useBuyCourse';

export function BuyCourseModal() {
  const { course, isOpen, close } = useBuyCourseModal();

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
        <Button className='w-full' color='primary'>
          <Trans>Перейти к оплате</Trans>
        </Button>
      </AdaptiveModalFooter>
    </AdaptiveModal>
  );
}
