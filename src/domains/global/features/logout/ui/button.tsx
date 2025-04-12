import { Trans } from '@lingui/react/macro';
import { PiSignOutBold } from 'react-icons/pi';

import { Button } from '~/shared/ui/primitives/button/button';
import { useSession } from '~/domains/global/entities/session';

export function LogoutButton() {
  const { logout } = useSession();

  return (
    <Button onClick={logout} className='w-full'>
      <PiSignOutBold className='size-4' />
      <Trans>Выйти из аккаунта</Trans>
    </Button>
  );
}
