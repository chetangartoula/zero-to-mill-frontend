import { z } from "zod";

export const WithDrawSchema = z.object({
  email: z.string().email(),
  withdraw_method: z.string(),
  amount: z.number(),
});

export const WithDrawVerifySchema = z.object({
  mpin: z.string().min(4),
});
