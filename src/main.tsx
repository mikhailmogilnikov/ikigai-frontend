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
import { useSession } from './domains/global/entities/session';

const queryClient = new QueryClient(queryClientConfig);

const router = createRouter({
  routeTree,
  context: { queryClient, session: null },
  defaultPreload: 'intent',
  // Since we're using React Query, we don't want loader calls to ever be stale
  // This will ensure that the loader is always called when the route is preloaded or visited
  defaultPreloadStaleTime: 0,
  scrollRestoration: true,
  defaultPendingComponent: () => <PageLoader type='layout' />,
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

async function enableMocking() {
  if (import.meta.env.VITE_ENABLE_MOCKING !== 'true') return;

  const { worker } = await import('~/shared/api/mocks/browser');

  return worker.start();
}

export const App = () => {
  const { session } = useSession();

  return <RouterProvider router={router} context={{ session }} />;
};

enableMocking()
  .then(() => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    createRoot(document.getElementById('root')!).render(
      <StrictMode>
        <Providers queryClient={queryClient}>
          <App />
        </Providers>
      </StrictMode>,
    );
  })
  .catch((error: unknown) => {
    // eslint-disable-next-line no-console
    console.error(error);
  });
