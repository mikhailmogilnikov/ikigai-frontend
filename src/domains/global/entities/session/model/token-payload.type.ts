import { ApiComponents } from '~/shared/api';

export type Token = string;

export interface TokenPayload {
  sub: number;
  exp: number;
  role: ApiComponents['UserRoles'];
}
