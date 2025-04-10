import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface AppLayoutState {
  sidebar: React.ReactNode | null;

  setSidebar: (sidebar: React.ReactNode | null) => void;
}

export const useAppLayout = create<AppLayoutState>()(
  devtools((set) => ({
    sidebar: null,
    setSidebar: (sidebar: React.ReactNode | null) => {
      set({ sidebar });
    },
  })),
);
