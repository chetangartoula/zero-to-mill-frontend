"use server";

import { axiosInstance } from "@/lib/axios";
import { LoginDTO, LoginResponse } from "@/types/base";
import { AxiosResponse, isAxiosError } from "axios";
import { isString } from "lodash";
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
      return response as AxiosResponse;
    }
  } catch (error) {
    if (isString(error)) {
      return { error };
    } else if (isAxiosError(error)) {
      return error.response?.data;
    }
  }
}
