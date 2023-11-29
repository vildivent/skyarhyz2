import { create } from "zustand";

type ProfileMenuState = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};
export const useProfileMenuStore = create<ProfileMenuState>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen) => {
    set({ isOpen });
  },
}));
