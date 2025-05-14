import { Link } from '@tanstack/react-router';

import { LogoIcon } from '~/shared/assets/svg/logo';
import { Flex } from '~/shared/ui/primitives/flex';

import { HeaderDesktopNavigation } from './desktop-navigation';
import { EducationHeaderMenuButtons } from './menu-buttons';

export function EducationHeader() {
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

      <EducationHeaderMenuButtons />
    </>
  );
}
