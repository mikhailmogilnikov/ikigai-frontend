import { ThemeConfig } from '@blur-ui/tailwind-themes';

const LightColors = {
  scheme: 'light',
  colors: {
    background: { color: 'hsl(0, 0%, 95%)', generatePalette: false },
    foreground: {
      color: 'hsl(0, 0%, 0%)',
      generatePalette: false,
    },
    default: 'hsl(0, 0%, 100%)',
    divider: 'hsl(0, 0%, 85%)',
  },
} as const satisfies ThemeConfig['themes']['light'];

const DarkColors = {
  scheme: 'dark',
  colors: {
    background: { color: 'hsl(0, 0%, 0%)', generatePalette: false },
    foreground: { color: 'hsl(0, 0%, 100%)', generatePalette: false },
    default: 'hsl(0, 0%, 10%)',
    divider: 'hsl(0, 0%, 20%)',
  },
} as const satisfies ThemeConfig['themes']['dark'];

export const AppThemes = {
  default: {
    scheme: 'light',
    layout: {
      spacing: '0.25rem',
      transitionDuration: '0.2s',
    },
  },
  themes: {
    light: LightColors,
    dark: DarkColors,
  },
} as const satisfies ThemeConfig;
