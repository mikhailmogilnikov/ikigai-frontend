import { useEffect } from 'react';

import { LocalStorageService } from '~/shared/lib/services/storage';

import { useTheme } from '../hooks/use-theme';
import { AppThemes } from '../../config/themes';

export function IsolatedThemeHandler() {
  const { theme, setResolvedTheme } = useTheme();

  useEffect(() => {
    const root = window.document.documentElement;
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');

    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      LocalStorageService.setItem('theme', 'system');
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

      root.classList.add(systemTheme);

      if (metaThemeColor) {
        metaThemeColor.setAttribute(
          'content',
          systemTheme === 'dark'
            ? AppThemes.themes.dark.colors.background.color
            : AppThemes.themes.light.colors.background.color,
        );
      }

      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

      const handleChangeSystemTheme = () => {
        const newSystemTheme = mediaQuery.matches ? 'dark' : 'light';

        root.classList.remove('light', 'dark');
        root.classList.add(newSystemTheme);
        setResolvedTheme(newSystemTheme);

        if (metaThemeColor) {
          metaThemeColor.setAttribute('content', newSystemTheme === 'dark' ? '#000000' : '#ffffff');
        }
      };

      mediaQuery.addEventListener('change', handleChangeSystemTheme);

      return () => {
        mediaQuery.removeEventListener('change', handleChangeSystemTheme);
      };
    } else {
      root.classList.add(theme);
      setResolvedTheme(theme);
      LocalStorageService.setItem('theme', theme);

      if (metaThemeColor) {
        metaThemeColor.setAttribute(
          'content',
          theme === 'dark'
            ? AppThemes.themes.dark.colors.background.color
            : AppThemes.themes.light.colors.background.color,
        );
      }
    }
  }, [theme, setResolvedTheme]);

  return null;
}
