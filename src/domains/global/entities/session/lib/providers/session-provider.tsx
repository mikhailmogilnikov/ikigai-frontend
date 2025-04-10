import { useEffect } from 'react';

import { LocalStorageService } from '~/shared/lib/services/storage';
import { checkIsDateExpire } from '~/shared/lib/utils/date/check-is-date-expire';

import { useSessionStore } from '../hooks/use-session-store';
import { decodeToken } from '../utils/decode-token';
import { useSession } from '../hooks/use-session';

interface SessionProviderProps {
  children: React.ReactNode;
}

export function SessionProvider({ children }: SessionProviderProps) {
  const { isInitialized, setIsAuthenticated, setPayload, setIsInitialized } = useSessionStore();
  const { logout } = useSession();

  useEffect(() => {
    const accessToken = LocalStorageService.getItem('access_token', 'safe');

    if (accessToken) {
      try {
        const tokenPayload = decodeToken(accessToken);
        const isTokenExpired = checkIsDateExpire(tokenPayload.exp);

        if (isTokenExpired) {
          logout();
        } else {
          setIsAuthenticated(true);
          setPayload(tokenPayload);
        }
      } catch {
        logout();
      }
    }

    setIsInitialized(true);
  }, []);

  if (!isInitialized) {
    return null;
  }

  return <>{children}</>;
}
