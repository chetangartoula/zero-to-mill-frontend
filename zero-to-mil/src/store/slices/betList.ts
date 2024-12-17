import { StateCreator } from "zustand";

export interface BetListProps {
  activeTabKey: string | null;
  activeSportKey: string | null;
  setActiveTabKey: (activeTabKey: string) => void;
  setActiveSportKey: (activeSportKey: string) => void;
}

export const createBetListStore: StateCreator<BetListProps> = (set) => ({
  activeTabKey: null,
  activeSportKey: null,
  setActiveTabKey: (activeTabKey: string) => set({ activeTabKey }),
  setActiveSportKey: (activeSportKey: string) => set({ activeSportKey }),
});
