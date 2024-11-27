import { z } from "zod";

export const ChangeMPINSchema = z.object({
  old_mpin: z.string().email(),
  new_mpin: z.string(),
  confirm_mpin: z.string(),
});

export const SetMPINSchema = z.object({
  new_mpin: z.string(),
  confirm_mpin: z.string(),
});
