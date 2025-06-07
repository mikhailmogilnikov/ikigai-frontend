import { Locale } from '~/domains/global/entities/i18n';

const DEFAULT_LOCALE: `${Locale}` = 'ru';

export const CONFIG = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
  DEFAULT_LOCALE,
  CREDENTIAL_ROUTES: {
    PUBLIC: ['/auth/login'],
    PRIVATE: ['/auth/refresh', '/auth/logout'],
  },
} as const;
