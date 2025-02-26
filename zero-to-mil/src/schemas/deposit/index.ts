import { z } from "zod";

export const DepositSchema = z.object({
  currency: z.string().min(1, "Currency is required"),
  deposit_method: z.string().min(1, "Deposit method is required"),
  user_identity: z.string(),
  amount: z.number().min(1, "Amount is required"),
  remarks: z.string(),
});
