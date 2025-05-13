import { QueryClient } from '@tanstack/react-query';

import { IsolatedThemeHandler } from '~/domains/global/entities/theme';
import { I18nProvider } from '~/domains/global/entities/i18n';

import { QueryProvider } from './query';

interface ProvidersProps {
  children: React.ReactNode;
  queryClient: QueryClient;
}

export function Providers({ children, queryClient }: ProvidersProps) {
  return (
    <>
      <IsolatedThemeHandler />
      <QueryProvider queryClient={queryClient}>
        <I18nProvider>{children}</I18nProvider>
      </QueryProvider>
    </>
  );
}
