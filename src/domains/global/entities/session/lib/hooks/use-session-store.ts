import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { Session } from '../../model/session.type';

interface SessionState {
  isAuthenticated: Session['isAuthenticated'];
  user: Session['user'];
  setIsAuthenticated: (isAuthenticated: Session['isAuthenticated']) => void;
  setUser: (user: Session['user']) => void;
}

const useSessionStore = create<SessionState>()(
  devtools((set) => ({
    isAuthenticated: false,
    user: null,
    setIsAuthenticated: (isAuthenticated: Session['isAuthenticated']) => {
      set({ isAuthenticated });
    },
    setUser: (user: Session['user']) => {
      set({ user });
    },
  })),
);

export { useSessionStore };
