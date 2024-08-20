"use server";
import { cookies } from "next/headers";

export default async function logout() {
  cookies().delete("refreshToken");
  return {
    status: 200,
    message: "Logged out successfully",
  };
}
