import { useEffect } from 'react';

import { useTheme } from '../hooks/use-theme';

export function IsolatedThemeHandler() {
  const { theme, setResolvedTheme } = useTheme();

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

      root.classList.add(systemTheme);

      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

      const handleChangeSystemTheme = () => {
        const newSystemTheme = mediaQuery.matches ? 'dark' : 'light';

        root.classList.remove('light', 'dark');
        root.classList.add(newSystemTheme);
        setResolvedTheme(newSystemTheme);
      };

      mediaQuery.addEventListener('change', handleChangeSystemTheme);

      return () => {
        mediaQuery.removeEventListener('change', handleChangeSystemTheme);
      };
    } else {
      root.classList.add(theme);
      setResolvedTheme(theme);
    }
  }, [theme, setResolvedTheme]);

  return null;
}
