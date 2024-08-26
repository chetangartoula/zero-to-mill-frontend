import { z } from "zod";

export const AccountSettingsSchema = z.object({
  email: z.string().email(),
  username: z.string(),
  password: z.string(),
});
