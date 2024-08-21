import { z } from "zod";

export const DepositSchema = z.object({
  currency: z.string(),
  deposit_method: z.string(),
  email: z.string().email(),
  amount: z.number(),
});
