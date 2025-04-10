import { TokenPayload } from './token-payload.type';

export interface LoginPayload {
  access_token: string;
}

export type SessionPayload = TokenPayload | null;

export interface Session {
  isAuthenticated: boolean;
  payload: SessionPayload;
  login: (payload: LoginPayload) => void;
  logout: () => void;
}
