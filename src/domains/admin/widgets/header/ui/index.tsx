import { Link } from '@tanstack/react-router';

import { LogoIcon } from '~/shared/assets/svg/logo';
import { Flex } from '~/shared/ui/primitives/flex';
import { useSession } from '~/domains/global/entities/session';

import { HeaderDesktopNavigationAdmin } from './desktop-navigation';

export function AdminHeader() {
  const { logout } = useSession();

  return (
    <>
      <Flex align='center'>
        <Link to='/admin/courses' className='rounded-sm'>
          <h1 id='logo' className='sr-only'>
            IKIGAI
          </h1>

          <LogoIcon className='h-8 py-1' />
        </Link>

        <HeaderDesktopNavigationAdmin />
      </Flex>
      <button onClick={logout}>Выйти</button>
    </>
  );
}
