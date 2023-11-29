import { create } from "zustand";

type SidebarState = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};
export const useSidebarStore = create<SidebarState>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen) => {
    set({ isOpen });
  },
}));
