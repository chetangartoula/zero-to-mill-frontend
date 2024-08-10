import { z } from "zod";

export const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

export const otpVerificationSchema = z.object({
  otp_code: z.string().length(6),
});

export const newPasswordSchema = z
  .object({
    password: z.string().min(8),
    passwordConfirmation: z.string().min(8),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
  });
