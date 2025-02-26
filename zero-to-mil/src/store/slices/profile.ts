import { StateCreator } from "zustand";

export interface ProfileState {
  profile_image: string;
  profile_email: string;
  profile_username: string;
  setProfile: (balance: Omit<ProfileState, "setBalance">) => void;
}

export const createProfileStore: StateCreator<ProfileState> = (set) => ({
  profile_image: "",
  profile_email: "",
  profile_username: "",
  setProfile: (profile) => set(profile),
});
