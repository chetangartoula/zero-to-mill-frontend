"use server";
import { clearAxiosAuthTokens } from "@/utils/token";
import { cookies } from "next/headers";

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("refreshToken");
  clearAxiosAuthTokens();
  return {
    status: 200,
    message: "Logged out successfully",
  };
}
