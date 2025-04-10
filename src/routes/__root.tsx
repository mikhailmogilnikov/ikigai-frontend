import { createRootRoute, Outlet } from '@tanstack/react-router';

import { SessionProvider } from '~/domains/global/entities/session';

export const Route = createRootRoute({
  component: () => (
    <SessionProvider>
      <Outlet />
    </SessionProvider>
  ),
});
