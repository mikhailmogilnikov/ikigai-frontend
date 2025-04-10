import { UserRole } from '../../user';

export type Token = string;

export interface TokenPayload {
  sub: number;
  exp: number;
  role: `${UserRole}`;
}
