import { ApiComponents } from '~/shared/api';

export type Token = string;

export interface TokenPayload {
  sub: string;
  exp: number;
  role: ApiComponents['UserRoles'];
}
