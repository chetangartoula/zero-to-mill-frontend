import { z } from "zod";

export const ChangeMPINSchema = z
  .object({
    old_pin_code: z.string().email(),
    pin_code: z.string(),
    confirm_pin_code: z.string(),
  })
  .refine((data) => data.pin_code === data.confirm_pin_code, {
    message: "PIN code do not match",
    path: ["confirm_pin_code"],
  });

export const SetMPINSchema = z
  .object({
    pin_code: z.string(),
    confirm_pin_code: z.string(),
  })
  .refine((data) => data.pin_code === data.confirm_pin_code, {
    message: "PIN code do not match",
    path: ["confirm_pin_code"],
  });
