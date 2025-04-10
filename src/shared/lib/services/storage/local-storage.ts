import TypedLocalStore from 'typed-local-store';

import { Theme } from '~/domains/global/entities/theme';

interface AccessToken {
  data: string;
  expiresAt: string;
}

export interface LocalStorageSchema {
  theme: Theme;
  access_token: AccessToken;
}

export const LocalStorageService = new TypedLocalStore<LocalStorageSchema>({
  storage: 'localStorage',
});
