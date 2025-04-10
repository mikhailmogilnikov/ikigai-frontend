import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { Theme } from '../../model/theme.type';
import { getResolvedTheme, getInitTheme } from '../utils/get-theme';

interface ThemeState {
  theme: Theme;
  resolvedTheme: 'light' | 'dark';
  setTheme: (theme: Theme) => void;
  setResolvedTheme: (theme: 'light' | 'dark') => void;
}

const useTheme = create<ThemeState>()(
  devtools(
    (set) => ({
      theme: getInitTheme('system'),
      resolvedTheme: getResolvedTheme('system'),
      setTheme: (theme) => {
        set({ theme, resolvedTheme: getResolvedTheme(theme) });
      },
      setResolvedTheme: (resolvedTheme) => {
        set({ resolvedTheme });
      },
    }),
    { name: 'ThemeStore' },
  ),
);

export { useTheme };
