import { ChangeMPINSchema, SetMPINSchema } from "@/schemas/account-settings";
import { z } from "zod";
export interface MPINState {
  intial_sign_up: boolean;
  display_every_render: boolean;
  is_mpin_set: boolean;
}

export type ChangeMPINDTO = z.infer<typeof ChangeMPINSchema>;
export type SetMPINDTO = z.infer<typeof SetMPINSchema>;
