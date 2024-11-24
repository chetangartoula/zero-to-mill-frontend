"use server";
import { axiosInstance } from "@/lib/axios";
import { cookies } from "next/headers";

export default async function getAccessToken(): Promise<any> {
  const refresh = cookies().get("refreshToken")?.value;
  if (!refresh) {
    throw new Error("No refresh token found");
  }

  try {
    const response = await axiosInstance<{
      access: string;
    }>({
      method: "POST",
      url: "/auth/token/access/",
      data: {
        refresh,
      },
    });

    if (response.status === 200) {
      return response.data.access;
    } else {
      throw new Error("Failed to get access token");
    }
  } catch (error) {
    return error;
  }
}
