import { WithDrawSchema, WithDrawVerifySchema } from "@/schemas/withdraw";
import { z } from "zod";

export type WithDrawDTO = z.infer<typeof WithDrawSchema>;

export type WithDrawVerifyDTO = z.infer<typeof WithDrawVerifySchema>;
