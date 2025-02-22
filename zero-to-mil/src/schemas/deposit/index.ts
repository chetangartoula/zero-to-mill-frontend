import { z } from "zod";

export const DepositSchema = z.object({
  currency: z.string().min(1, "Currency is required"),
  deposit_method: z.string().min(1, "Deposit method is required"),
  user_identity: z.string().min(1, "Username is required"),
  amount: z.number().min(1, "Amount is required"),
  remarks: z.string().min(1, "Remarks is required"),
});
