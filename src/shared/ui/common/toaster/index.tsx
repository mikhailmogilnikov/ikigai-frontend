import { Toaster as SonnerToaster } from 'sonner';

import { useTheme } from '~/domains/global/entities/theme';

export function Toaster() {
  const { resolvedTheme } = useTheme();

  return <SonnerToaster richColors theme={resolvedTheme} />;
}
