"use server";

import { axiosInstance } from "@/lib/axios";
import { LoginDTO, LoginResponse } from "@/types/base";
import { AxiosResponse, isAxiosError } from "axios";
import { cookies } from "next/headers";

export default async function LoginUser(data: LoginDTO) {
  try {
    const response = await axiosInstance({
      method: "POST",
      name: "login",
      data,
    });
    if (response.status === 200) {
      cookies().set("refreshToken", response.data.refresh, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60,
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        sameSite: "strict",
      });
      return response.data as LoginResponse;
    } else {
      throw new Error();
    }
  } catch (error) {
    if (isAxiosError(error)) {
      return new Error(error.response?.data.message || "An error occurred");
    } else {
      return new Error("An unexpected error occurred");
    }
  }
}
