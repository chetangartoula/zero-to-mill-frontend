import {
  forgotPasswordSchema,
  newPasswordSchema,
  otpVerificationSchema,
} from "@/schemas/auth";
import { z } from "zod";

export type forgotPasswordDTO = z.infer<typeof forgotPasswordSchema>;
export type otpDTO = z.infer<typeof otpVerificationSchema>;
export type newPasswordDTO = z.infer<typeof newPasswordSchema>;
