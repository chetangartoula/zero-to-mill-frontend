import { create } from "zustand";

export interface AccessTokenState {
  accessToken: string;
  setAccessToken: (accessToken: string) => void;
  removeAccessToken: () => void;
}

export const useAuthStore = create<AccessTokenState>((set) => ({
  accessToken: "",
  setAccessToken: (accessToken: string) => set({ accessToken }),
  removeAccessToken: () => set({ accessToken: "" }),
}));
