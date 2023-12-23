import { create } from "zustand";

type ExcursionMenuState = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};
export const useExcursionMenuStore = create<ExcursionMenuState>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen) => {
    set({ isOpen });
  },
}));
