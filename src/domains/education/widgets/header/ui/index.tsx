import { Link } from '@tanstack/react-router';
import { useState } from 'react';

import { useTheme } from '~/domains/global/entities/theme';
import { LogoIcon } from '~/shared/assets/svg/logo';
import { Sheet, SheetContent, SheetHeader } from '~/shared/ui/overlays/sheet';
import { Flex } from '~/shared/ui/primitives/flex';
import { Divider } from '~/shared/ui/primitives/divider';

import { EducationMenu } from '../../menu';

import { HeaderDesktopNavigation } from './desktop-navigation';

export function EducationHeader() {
  const { theme, setTheme } = useTheme();

  const [isSheetOpen, setSheetOpen] = useState(false);

  return (
    <>
      <Flex align='center'>
        <Link to='/' className='rounded-sm'>
          <h1 id='logo' className='sr-only'>
            IKIGAI
          </h1>

          <LogoIcon className='h-8 py-1' />
        </Link>

        <HeaderDesktopNavigation />
      </Flex>

      <Flex align='center' gap='sm'>
        <button
          onClick={() => {
            setSheetOpen(true);
          }}
        >
          sheet
        </button>
        <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
          <SheetHeader>Курс 1</SheetHeader>
          <SheetContent>h</SheetContent>
        </Sheet>
        <button
          onClick={() => {
            setTheme(theme === 'light' ? 'dark' : 'light');
          }}
        >
          {theme === 'light' ? 'Dark' : 'Light'}
        </button>
        <Divider vertical className='bg-divider -mr-1.5 h-5' />
        <EducationMenu />
      </Flex>
    </>
  );
}
