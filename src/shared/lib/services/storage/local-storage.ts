import TypedLocalStore from 'typed-local-store';

export interface LocalStorageSchema {
  theme: 'light' | 'dark' | 'system';
}

export const LocalStorageService = new TypedLocalStore<LocalStorageSchema>({
  storage: 'localStorage',
});
