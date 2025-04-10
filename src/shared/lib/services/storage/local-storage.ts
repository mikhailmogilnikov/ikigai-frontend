import TypedLocalStore from 'typed-local-store';

import { Theme } from '~/domains/global/entities/theme';
import { Token } from '~/domains/global/entities/session';

export interface LocalStorageSchema {
  theme: Theme;
  access_token: Token;
}

export const LocalStorageService = new TypedLocalStore<LocalStorageSchema>({
  storage: 'localStorage',
});
