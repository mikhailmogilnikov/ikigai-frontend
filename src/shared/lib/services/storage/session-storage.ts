import TypedLocalStore from 'typed-local-store';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SessionStorageSchema {}

export const SessionStorageService = new TypedLocalStore<SessionStorageSchema>({
  storage: 'sessionStorage',
});
