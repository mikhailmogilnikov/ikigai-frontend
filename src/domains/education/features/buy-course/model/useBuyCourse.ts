import { create } from 'zustand';

interface BuyCourse {
  id: number;
  title: string;
  price: number;
}

interface BuyCourseModalStore {
  course: BuyCourse | null;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  open: (course: BuyCourse) => void;
  close: () => void;
}

const useBuyCourseModal = create<BuyCourseModalStore>((set) => ({
  course: null,
  isOpen: false,
  setIsOpen: (isOpen) => {
    set({ isOpen });
  },
  open: (course) => {
    set({ isOpen: true, course });
  },
  close: () => {
    set({ isOpen: false });
    setTimeout(() => {
      set({ course: null });
    }, 200);
  },
}));

export { useBuyCourseModal };
