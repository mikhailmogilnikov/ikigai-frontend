import { useEffect, useMemo, useState } from 'react';

import { LocalStorageSchema, LocalStorageService } from '~/shared/lib/services/storage';

import { ThemeProviderContext } from '../hooks/use-theme';
import { Theme } from '../../model/theme.type';

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: keyof LocalStorageSchema;
}

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'theme',
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => LocalStorageService.getItem(storageKey, 'safe') ?? defaultTheme);
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>(() =>
    theme === 'system' ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') : theme,
  );

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

      root.classList.add(systemTheme);
      setResolvedTheme(systemTheme);

      return;
    }

    root.classList.add(theme);
    setResolvedTheme(theme);
  }, [theme]);

  const value = useMemo(
    () => ({
      theme,
      resolvedTheme,
      setTheme: (theme: Theme) => {
        LocalStorageService.setItem(storageKey, theme);
        setTheme(theme);
      },
    }),
    [theme, resolvedTheme, storageKey],
  );

  return (
    <ThemeProviderContext {...props} value={value}>
      {children}
    </ThemeProviderContext>
  );
}
