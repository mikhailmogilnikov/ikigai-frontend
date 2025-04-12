import { Link } from '@tanstack/react-router';

import { LogoIcon } from '~/shared/assets/svg/logo';
import { Flex } from '~/shared/ui/primitives/flex';
import { Divider } from '~/shared/ui/primitives/divider';

import { EducationMenu } from '../../menu';

import { HeaderDesktopNavigation } from './desktop-navigation';

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

      <Flex align='center' gap='sm'>
        <Divider vertical className='bg-divider -mr-1.5 h-5' />
        <EducationMenu />
      </Flex>
    </>
  );
}
