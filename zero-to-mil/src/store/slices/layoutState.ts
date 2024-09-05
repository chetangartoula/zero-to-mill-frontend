import { create } from "zustand";

export interface LayoutState {
  width: number;
  isMobile: boolean;
  setWidth: (width: number) => void;
}

export const useLayoutStore = create<LayoutState>((set) => ({
  width: 0,
  isMobile: false,
  setWidth: (width) => set({ width, isMobile: width < 768 }),
}));
