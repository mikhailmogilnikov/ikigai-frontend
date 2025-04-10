import { useNavigate } from '@tanstack/react-router';

import { LocalStorageService } from '~/shared/lib/services/storage';

import { LoginPayload } from '../../model/session.type';

import { useSessionStore } from './use-session-store';

export const useSession = () => {
  const { isAuthenticated, user, setIsAuthenticated, setUser } = useSessionStore();
  const navigate = useNavigate();

  const login = (payload: LoginPayload) => {
    LocalStorageService.setItem('access_token', {
      data: payload.token,
      expiresAt: payload.expiresAt,
    });
    setIsAuthenticated(true);
    setUser(payload.user);

    switch (payload.user.role) {
      case 'admin':
        void navigate({ to: '/admin/dashboard' });
        break;
      case 'student':
        void navigate({ to: '/' });
    }
  };

  const logout = () => {
    LocalStorageService.removeItem('access_token');
    setIsAuthenticated(false);
    setUser(null);
    void navigate({ to: '/auth/sign-in' });
  };

  return { login, logout, isAuthenticated, user };
};
