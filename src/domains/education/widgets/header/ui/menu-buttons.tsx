import { useState } from 'react';
import { useMediaQuery } from 'usehooks-ts';
import { PiListBold } from 'react-icons/pi';

import { Flex } from '~/shared/ui/primitives/flex';
import { useAppLayout } from '~/domains/global/widgets/layout';
import { BREAKPOINT_MOBILE } from '~/shared/config';
import { Divider } from '~/shared/ui/primitives/divider';
import { Sheet } from '~/shared/ui/overlays/sheet';

import { EducationMenu } from '../../menu';

export function EducationHeaderMenuButtons() {
  return (
    <Flex align='center' gap='sm'>
      <SidebarMobileMenuButton />
      <EducationMenu />
    </Flex>
  );
}

function SidebarMobileMenuButton() {
  const isMobile = useMediaQuery(BREAKPOINT_MOBILE);
  const { sidebar } = useAppLayout();
  const [isShowMobileSidebar, setIsShowMobileSidebar] = useState(false);

  const isShowMenu = isMobile && sidebar;

  const handleOpenSidebar = () => {
    setIsShowMobileSidebar(true);
  };

  if (!isShowMenu) return null;

  return (
    <>
      <button
        onClick={handleOpenSidebar}
        className='bg-default mr-1 flex h-8 w-8 items-center justify-center rounded-md'
      >
        <PiListBold className='h-5 w-5' />
      </button>
      <Sheet open={isShowMobileSidebar} onOpenChange={setIsShowMobileSidebar}>
        {sidebar}
      </Sheet>
      <Divider vertical className='bg-divider -mr-1.5 h-5' />
    </>
  );
}
