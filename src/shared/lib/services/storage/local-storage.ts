import TypedLocalStore from 'typed-local-store';

import { Theme } from '~/domains/global/entities/theme';
import { Token } from '~/domains/global/entities/session';
import { Locale } from '~/domains/global/entities/i18n';

export interface LocalStorageSchema {
  theme: Theme;
  access_token: Token;
  locale: `${Locale}`;
}

export const LocalStorageService = new TypedLocalStore<LocalStorageSchema>({
  storage: 'localStorage',
});
