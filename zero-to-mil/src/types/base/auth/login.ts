import { LoginSchema } from "@/schemas/auth";
import { BaseApiResponse } from "@/types/global";
import { z } from "zod";

export interface LoginResponse {
  token: string;
  refreshToken: string;
}

export type LoginDTO = z.infer<typeof LoginSchema>;
export type LoginSuccessApiResponse = BaseApiResponse<LoginResponse>;
