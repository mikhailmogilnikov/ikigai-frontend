import { defineConfig } from '@lingui/cli';

export default defineConfig({
  locales: ['en', 'ru'],
  sourceLocale: 'ru',

  catalogs: [
    {
      path: '<rootDir>/src/shared/i18n/locales/{locale}/messages',
      include: ['<rootDir>/src'],
      exclude: ['**/node_modules/**'],
    },
  ],

  format: 'po',
});
