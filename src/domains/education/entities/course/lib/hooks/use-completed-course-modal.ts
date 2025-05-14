import { create } from 'zustand';

interface CompletedCourseModalState {
  open: boolean;
  onOpenChange: () => void;
}

export const useCompletedCourseModal = create<CompletedCourseModalState>((set) => ({
  open: false,
  onOpenChange: () => {
    set((state) => ({ open: !state.open }));
  },
}));
