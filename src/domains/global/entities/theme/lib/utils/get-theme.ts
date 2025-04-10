import { LocalStorageService } from '~/shared/lib/services/storage';

import { Theme } from '../../model/theme.type';

export const getInitTheme = (initTheme: Theme) => LocalStorageService.getItem('theme', 'safe') ?? initTheme;

export const getResolvedTheme = (theme: Theme) => {
  if (theme === 'system') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  return theme;
};
