import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface AppLayoutState {
  sidebar: React.ReactNode | null;
  scrollToTop: () => void;
  setSidebar: (sidebar: React.ReactNode | null) => void;
  setScrollToTop: (scrollToTop: () => void) => void;
}

export const useAppLayout = create<AppLayoutState>()(
  devtools((set) => ({
    sidebar: null,
    scrollToTop: () => void 0,
    setSidebar: (sidebar: React.ReactNode | null) => {
      set({ sidebar });
    },
    setScrollToTop: (scrollToTop: () => void) => {
      set({ scrollToTop });
    },
  })),
);
