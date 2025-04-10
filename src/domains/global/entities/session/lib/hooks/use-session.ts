import { useNavigate } from '@tanstack/react-router';

import { LocalStorageService } from '~/shared/lib/services/storage';

import { LoginPayload, Session } from '../../model/session.type';
import { decodeToken } from '../utils/decode-token';

import { useSessionStore } from './use-session-store';

export const useSession = (): Session => {
  const { isAuthenticated, payload, setIsAuthenticated, setPayload } = useSessionStore();
  const navigate = useNavigate();

  const login = (payload: LoginPayload) => {
    const tokenPayload = decodeToken(payload.access_token);

    LocalStorageService.setItem('access_token', payload.access_token);

    setIsAuthenticated(true);
    setPayload(tokenPayload);

    switch (tokenPayload.role) {
      case 'admin':
        void navigate({ to: '/admin/dashboard' });
        break;
      case 'student':
        void navigate({ to: '/' });
        break;
    }
  };

  const logout = () => {
    LocalStorageService.removeItem('access_token');
    setIsAuthenticated(false);
    setPayload(null);
    void navigate({ to: '/auth/sign-in' });
  };

  return { login, logout, isAuthenticated, payload };
};
