import { Trans } from '@lingui/react/macro';
import { PiSignOutBold } from 'react-icons/pi';
import { useQueryClient } from '@tanstack/react-query';

import { Button } from '~/shared/ui/primitives/button/button';
import { useSession } from '~/domains/global/entities/session';

export function LogoutButton() {
  const { logout } = useSession();
  const queryClient = useQueryClient();

  const handleLogout = () => {
    queryClient.clear();
    logout();
  };

  return (
    <Button onClick={handleLogout} className='w-full'>
      <PiSignOutBold className='size-4' />
      <Trans>Выйти из аккаунта</Trans>
    </Button>
  );
}
