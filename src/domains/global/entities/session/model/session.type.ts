import { TokenPayload } from './token-payload.type';

export interface LoginPayload {
  access_token: string;
}

export type Session = TokenPayload;
