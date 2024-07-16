import { z } from "zod";

export const LoginSchema = z.object({
  username: z.string().email(),
  password: z.string().min(8),
});
