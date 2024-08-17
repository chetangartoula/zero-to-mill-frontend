import { LoginSchema } from "@/schemas/auth";
import { BaseApiResponse } from "@/types/global";
import { z } from "zod";

export interface LoginResponse {
  access: string;
  refresh: string;
}

export type LoginDTO = z.infer<typeof LoginSchema>;
export type LoginSuccessApiResponse = BaseApiResponse<LoginResponse>;
