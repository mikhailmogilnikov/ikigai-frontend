import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface AppLayoutState {
  header: React.ReactNode | null;
  sidebar: React.ReactNode | null;
  setHeader: (header: React.ReactNode | null) => void;
  setSidebar: (sidebar: React.ReactNode | null) => void;
}

export const useAppLayout = create<AppLayoutState>()(
  devtools((set) => ({
    header: null,
    sidebar: null,
    setHeader: (header: React.ReactNode | null) => {
      set({ header });
    },
    setSidebar: (sidebar: React.ReactNode | null) => {
      set({ sidebar });
    },
  })),
);
