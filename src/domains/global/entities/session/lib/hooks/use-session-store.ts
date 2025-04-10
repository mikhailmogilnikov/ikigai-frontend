import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { Session, SessionPayload } from '../../model/session.type';

interface SessionState {
  isAuthenticated: Session['isAuthenticated'];
  payload: SessionPayload;
  setIsAuthenticated: (isAuthenticated: Session['isAuthenticated']) => void;
  setPayload: (payload: SessionPayload) => void;
  isInitialized: boolean;
  setIsInitialized: (isInitialized: boolean) => void;
}

const useSessionStore = create<SessionState>()(
  devtools((set) => ({
    isAuthenticated: false,
    payload: null,
    isInitialized: false,
    setIsAuthenticated: (isAuthenticated: Session['isAuthenticated']) => {
      set({ isAuthenticated });
    },
    setPayload: (payload: SessionPayload) => {
      set({ payload });
    },
    setIsInitialized: (isInitialized: boolean) => {
      set({ isInitialized });
    },
  })),
);

export { useSessionStore };
