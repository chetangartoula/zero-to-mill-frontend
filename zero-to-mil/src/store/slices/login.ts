import { LoginDTO } from "@/types/base";
import { StateCreator } from "zustand";

export interface LoginState {
  username: string;
  password: string;
  setLoginState: ({ username, password }: LoginDTO) => void;
}

export const createLoginStore: StateCreator<LoginState> = (set) => ({
  username: "",
  password: "",
  setLoginState: ({ username, password }) => set({ username, password }),
});
