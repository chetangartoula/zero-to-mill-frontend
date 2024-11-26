import { z } from "zod";

export const DepositSchema = z.object({
  currency: z.string(),
  deposit_method: z.string(),
  user_identity: z.string(),
  amount: z.number(),
  remarks: z.string(),
});
