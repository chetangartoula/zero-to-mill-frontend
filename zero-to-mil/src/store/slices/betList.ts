import { StateCreator } from "zustand";

export interface BetListState {
  activeTabKey: string | null;
  activeSportKey: string | null;
  setActiveTabKey: (activeTabKey: string) => void;
  setActiveSportKey: (activeSportKey: string) => void;
}

export const createBetListStore: StateCreator<BetListState> = (set) => ({
  activeTabKey: null,
  activeSportKey: null,
  setActiveTabKey: (activeTabKey: string) => set({ activeTabKey }),
  setActiveSportKey: (activeSportKey: string) => set({ activeSportKey }),
});
