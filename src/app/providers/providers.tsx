import { IsolatedThemeHandler } from '~/domains/global/entities/theme';
import { I18nProvider } from '~/domains/global/entities/i18n';

import { QueryProvider } from './query';

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <>
      <IsolatedThemeHandler />
      <QueryProvider>
        <I18nProvider>{children}</I18nProvider>
      </QueryProvider>
    </>
  );
}
