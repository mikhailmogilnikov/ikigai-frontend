import { LocalStorageService } from '~/shared/lib/services/storage';

export const checkTokenExpire = () => {
  const accessToken = LocalStorageService.getItem('access_token', 'safe');

  if (!accessToken) {
    return false;
  }

  const now = new Date();
  const expiresAtDate = new Date(accessToken.expiresAt);

  return now > expiresAtDate;
};
