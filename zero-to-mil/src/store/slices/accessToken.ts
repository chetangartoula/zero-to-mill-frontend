import { StateCreator } from "zustand";

export interface AccessTokenState {
  accessToken: string;
  tokenTime: string;
  setAccessToken: (accessToken: string, tokenTime: string) => void;
  removeAccessToken: () => void;
  isTokenValid: () => boolean;
}

export const createAuthStore: StateCreator<AccessTokenState> = (set, get) => ({
  accessToken: "",
  tokenTime: "",
  setAccessToken: (accessToken: string, tokenTime: string) =>
    set({ accessToken, tokenTime }),
  removeAccessToken: () => set({ accessToken: "" }),
  isTokenValid: () => {
    const { accessToken, tokenTime } = get();
    return !!accessToken && !!tokenTime && new Date() < new Date(tokenTime);
  },
});
