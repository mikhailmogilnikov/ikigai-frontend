import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { QueryClient } from '@tanstack/react-query';

import { SessionProvider } from '~/domains/global/entities/session';
import { DefaultErrorPage } from '~/domains/global/widgets/error-page';

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: () => (
    <SessionProvider>
      <Outlet />
    </SessionProvider>
  ),
  errorComponent: ({ error, reset }) => <DefaultErrorPage error={error} reset={reset} />,
});
