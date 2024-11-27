import { z } from "zod";

export const ChangePasswordSchema = z.object({
  old_password: z.string().email(),
  new_password: z.string(),
  confirm_password: z.string(),
});
