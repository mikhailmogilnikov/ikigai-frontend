import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { QueryClient } from '@tanstack/react-query';

import { Session, SessionController } from '~/domains/global/entities/session';
import { DefaultErrorPage } from '~/domains/global/widgets/error-page';
import { Toaster } from '~/shared/ui/common/toaster';

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
  session: Session | null;
}>()({
  component: () => (
    <>
      <SessionController />
      <Toaster />
      <Outlet />
    </>
  ),
  errorComponent: ({ error, reset }) => <DefaultErrorPage error={error} reset={reset} />,
});
