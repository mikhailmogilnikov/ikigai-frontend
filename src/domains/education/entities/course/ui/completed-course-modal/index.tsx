import { Trans } from '@lingui/react/macro';
import { useEffect } from 'react';

import { useCompletedCourseModal } from '~/domains/education/entities/course/lib/hooks/use-completed-course-modal';
import { startConfettiFireworks } from '~/shared/lib/utils';
import { AdaptiveModal, AdaptiveModalContent, AdaptiveModalFooter } from '~/shared/ui/overlays/adaptive-modal';
import { Button } from '~/shared/ui/primitives/button/button';
import { Flex } from '~/shared/ui/primitives/flex';
import { LinkButton } from '~/shared/ui/primitives/link-button';
import { Typo } from '~/shared/ui/primitives/typo';

export function CompletedCourseModal() {
  const { open, onOpenChange } = useCompletedCourseModal();

  useEffect(() => {
    if (open) {
      startConfettiFireworks();
    }
  }, [open]);

  return (
    <AdaptiveModal open={open} onOpenChange={onOpenChange}>
      <AdaptiveModalContent>
        <Flex col gap='lg' className='mt-12 items-center px-6 text-center md:mb-2 md:mt-6'>
          <Typo size='xl' weight='semibold'>
            <Trans>Поздравляем с успешным завершением курса!</Trans>
          </Typo>
          <Typo size='base' weight='medium' className='opacity-50'>
            <Trans>
              Не стоит останавливаться на достигнутом, продолжайте изучать новые темы или повторите ранее пройденные.
              <br />
              <br />
              Завершенный курс будет доступен в вашем профиле в любое время.
            </Trans>
          </Typo>
        </Flex>
      </AdaptiveModalContent>
      <AdaptiveModalFooter>
        <Flex col gap='sm' className='w-full gap-3 p-3'>
          <LinkButton className='w-full' color='primary' to='/shop' onClick={onOpenChange}>
            <Trans>Посмотреть другие курсы</Trans>
          </LinkButton>
          <Button className='w-full' onClick={onOpenChange}>
            <Trans>Закрыть это окно</Trans>
          </Button>
        </Flex>
      </AdaptiveModalFooter>
    </AdaptiveModal>
  );
}
