import { createGStore } from 'create-gstore';
import { useState } from 'react';
import { redirect } from '@tanstack/react-router';

import { LocalStorageService } from '~/shared/lib/services/storage';
import { publicFetchClient } from '~/shared/api/instance';

import { LoginPayload } from '../../model/session.type';
import { decodeToken } from '../utils/decode-token';

let refreshTokenPromise: Promise<string | null> | null = null;

export const useSession = createGStore(() => {
  const [token, setToken] = useState<string | null>(() => LocalStorageService.getItem('access_token', 'safe'));

  const login = (payload: LoginPayload) => {
    const tokenPayload = decodeToken(payload.access_token);

    LocalStorageService.setItem('access_token', payload.access_token);

    setToken(payload.access_token);

    switch (tokenPayload.role) {
      case 'admin':
        redirect({ to: '/admin/courses' });
        break;
      case 'student':
        redirect({ to: '/' });
        break;
    }
  };

  const logout = () => {
    publicFetchClient
      .POST('/auth/logout')
      .catch(() => {
        //
      })
      .finally(() => {
        LocalStorageService.removeItem('access_token');
        setToken(null);
        redirect({ to: '/auth/sign-in' });
      });
  };

  const session = token ? decodeToken(token) : null;

  const refreshToken = async () => {
    if (!token) return null;

    const session = decodeToken(token);

    const isTokenExpired = session.exp < Date.now() / 1000 + 1;

    if (!isTokenExpired) return token;

    refreshTokenPromise ??= publicFetchClient
      .POST('/auth/refresh')
      .then((r) => r.data?.access_token ?? null)
      .then((newToken) => {
        if (newToken) {
          login({ access_token: newToken });

          return newToken;
        } else {
          logout();

          return null;
        }
      })
      .finally(() => {
        refreshTokenPromise = null;
      });

    const newToken = await refreshTokenPromise;

    if (newToken) {
      return newToken;
    } else {
      return null;
    }
  };

  return { login, logout, session, refreshToken };
});
