"use server";
import { axiosInstance } from "@/lib/axios";
import { cookies } from "next/headers";
import { isAxiosError } from "axios";

export default async function getAccessToken(): Promise<any> {
  const Token = cookies().get("refreshToken")?.value;

  if (!Token) {
    throw new Error("No refresh token found");
  }

  try {
    const response = await axiosInstance({
      method: "POST",
      url: "access-token",
      data: {
        Token,
      },
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to get access token");
    }
  } catch (error) {
    return error;
  }
}
