import { ChangePasswordSchema } from "@/schemas/account-settings";
import { z } from "zod";

export type ChangePasswordDTO = z.infer<typeof ChangePasswordSchema>;
