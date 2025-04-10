import { jwtDecode } from 'jwt-decode';

import { TokenPayload } from '../../model/token-payload.type';

export function decodeToken(token: string) {
  const decoded = jwtDecode<TokenPayload>(token);

  return decoded;
}
