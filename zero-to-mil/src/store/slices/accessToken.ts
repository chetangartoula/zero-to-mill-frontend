import { StateCreator } from "zustand";

export interface AccessTokenState {
  accessToken: string;
  setAccessToken: (accessToken: string) => void;
  removeAccessToken: () => void;
}

export const createAuthStore: StateCreator<AccessTokenState> = (set) => ({
  accessToken: "",
  setAccessToken: (accessToken: string) => set({ accessToken }),
  removeAccessToken: () => set({ accessToken: "" }),
});
