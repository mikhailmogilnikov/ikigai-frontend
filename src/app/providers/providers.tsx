import { ThemeProvider } from '~/domains/global/entities/theme';
import { I18nProvider } from '~/domains/global/entities/i18n';

import { QueryProvider } from './query';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <I18nProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </I18nProvider>
    </QueryProvider>
  );
}
