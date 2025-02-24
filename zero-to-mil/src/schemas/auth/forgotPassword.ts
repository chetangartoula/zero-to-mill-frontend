import { z } from "zod";

export const forgotPasswordSchema = z.object({
  user_identity: z.string().min(1, "Email/Username is required"),
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
