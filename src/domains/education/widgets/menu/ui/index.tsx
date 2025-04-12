import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { useState } from 'react';
import { PiCaretDownBold } from 'react-icons/pi';
import { Trans } from '@lingui/react/macro';

import {
  AdaptiveModal,
  AdaptiveModalContent,
  AdaptiveModalFooter,
  AdaptiveModalHeader,
} from '~/shared/ui/overlays/adaptive-modal/adaptive-modal';
import { Avatar } from '~/shared/ui/primitives/avatar';
import { Flex } from '~/shared/ui/primitives/flex';
import { LogoutButton } from '~/domains/global/features/logout';

import { UserInfo } from './user-info';
import { MenuNavigation } from './navigation';
import { MenuSettings } from './settings';

export function EducationMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenChange = () => {
    setIsOpen((prev) => !prev);
  };

  const handleCloseMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={handleOpenChange}
        className='hover:bg-default-50 dark:hover:bg-default-100 -mr-2 flex cursor-pointer items-center gap-2 rounded-md p-0.5 pl-2 transition-colors ease-linear'
      >
        <PiCaretDownBold
          className='size-3 opacity-40 transition-transform data-[open=true]:rotate-180'
          data-open={isOpen}
        />
        <Avatar src='https://i.pravatar.cc/300' alt='avatar' className='size-10' />
      </button>

      <AdaptiveModal open={isOpen} onOpenChange={handleOpenChange}>
        <VisuallyHidden>
          <AdaptiveModalHeader>
            <Trans>Меню</Trans>
          </AdaptiveModalHeader>
        </VisuallyHidden>
        <AdaptiveModalContent>
          <Flex col className='mt-4 gap-8 max-md:mt-12 md:mb-4'>
            <UserInfo />
            <MenuNavigation closeMenu={handleCloseMenu} />
            <MenuSettings />
          </Flex>
        </AdaptiveModalContent>
        <AdaptiveModalFooter>
          <LogoutButton />
        </AdaptiveModalFooter>
      </AdaptiveModal>
    </>
  );
}
