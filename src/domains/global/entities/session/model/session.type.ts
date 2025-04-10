import { User } from '~/domains/global/entities/user';

export interface LoginPayload {
  token: string;
  expiresAt: string;
  user: User;
}

export interface Session {
  isAuthenticated: boolean;
  user: User | null;
  login: (payload: LoginPayload) => void;
  logout: () => void;
}
