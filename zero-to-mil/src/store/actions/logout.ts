"use server";
import { clearAxiosAuthTokens } from "@/utils/token";
import { cookies } from "next/headers";

export async function logout() {
  cookies().delete("refreshToken");
  clearAxiosAuthTokens();
  return {
    status: 200,
    message: "Logged out successfully",
  };
}
