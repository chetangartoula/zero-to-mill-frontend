import { DepositSchema } from "@/schemas/deposit";
import { z } from "zod";

export type DepositDTO = z.infer<typeof DepositSchema>;
