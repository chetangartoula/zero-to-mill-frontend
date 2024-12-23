import { z } from "zod";

export const oddListSchema = z.object({
  amount: z.number(),
});
