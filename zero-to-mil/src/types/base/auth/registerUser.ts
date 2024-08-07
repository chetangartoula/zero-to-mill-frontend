import { RegisterSchema } from "@/schemas/auth";
import { z } from "zod";

export type RegisterDTO = z.infer<typeof RegisterSchema>;
