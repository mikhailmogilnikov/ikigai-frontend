import { createFileRoute } from '@tanstack/react-router';
import { Trans } from '@lingui/react/macro';

import { useSession } from '~/domains/global/entities/session';

export const Route = createFileRoute('/admin/_guard/dashboard')({
  component: RouteComponent,
});

function RouteComponent() {
  const { logout } = useSession();

  return (
    <div>
      <Trans>Hello "/admin/dashboard"!</Trans>
      <button onClick={logout}>
        <Trans>Logout</Trans>
      </button>
    </div>
  );
}
