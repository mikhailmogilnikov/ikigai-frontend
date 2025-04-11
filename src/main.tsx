import '~/app/css/globals.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { QueryClient } from '@tanstack/react-query';

import { Providers } from '~/app/providers';
import { queryClientConfig } from '~/shared/api';

import { routeTree } from './routeTree.gen';
import { PageLoader } from './shared/ui/common/page-loader';
import { NotFoundPage } from './domains/global/widgets/not-found';
import { DefaultErrorPage } from './domains/global/widgets/error-page';

const queryClient = new QueryClient(queryClientConfig);

const router = createRouter({
  routeTree,
  context: { queryClient },
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 30_000,
  scrollRestoration: true,
  defaultPendingComponent: () => <PageLoader type='fullscreen' />,
  defaultNotFoundComponent: () => <NotFoundPage />,
  defaultErrorComponent: ({ error, reset }) => <DefaultErrorPage error={error} reset={reset} />,
  defaultPendingMinMs: 0,
  defaultPendingMs: 0,
  defaultSsr: false,
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Providers queryClient={queryClient}>
      <RouterProvider router={router} />
    </Providers>
  </StrictMode>,
);
