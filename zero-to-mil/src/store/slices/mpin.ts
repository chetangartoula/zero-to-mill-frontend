import { MPINState } from "@/types/base/account-settings/mpin";
import { StateCreator } from "zustand";

export interface MPINGState {
  intial_sign_up: boolean;
  display_every_render: boolean;
  is_mpin_set: boolean;
  setMPINState: ({
    intial_sign_up,
    display_every_render,
    is_mpin_set,
  }: MPINState) => void;
}

export const createMPINStore: StateCreator<MPINGState> = (set) => ({
  intial_sign_up: false,
  display_every_render: false,
  is_mpin_set: true,
  setMPINState: ({ intial_sign_up, display_every_render, is_mpin_set }) =>
    set({ intial_sign_up, display_every_render, is_mpin_set }),
});
