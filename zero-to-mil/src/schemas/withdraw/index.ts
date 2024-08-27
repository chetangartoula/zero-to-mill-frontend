import { z } from "zod";

export const WithDrawSchema = z.object({
  email: z.string().email(),
  method: z.string(),
  amount: z.number(),
});
