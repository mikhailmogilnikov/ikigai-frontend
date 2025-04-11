import { createRootRoute, Outlet } from '@tanstack/react-router';

import { SessionProvider } from '~/domains/global/entities/session';
import { DefaultErrorPage } from '~/domains/global/widgets/error-page';

export const Route = createRootRoute({
  component: () => (
    <SessionProvider>
      <Outlet />
    </SessionProvider>
  ),
  errorComponent: ({ error, reset }) => <DefaultErrorPage error={error} reset={reset} />,
});
