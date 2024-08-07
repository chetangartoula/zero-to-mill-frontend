import { axiosInstance } from "@/lib/axios";
import {
  forgotPasswordDTO,
  LoginDTO,
  LoginSuccessApiResponse,
  newPasswordDTO,
  otpDTO,
  RegisterDTO,
} from "@/types/base";

export const loginUser = async (data: LoginDTO) => {
  const res = await axiosInstance({
    name: "login",
    method: "POST",
    data,
  });
  return res.data;
};

export const registerUser = async (data: RegisterDTO) => {
  const res = await axiosInstance({
    name: "register",
    method: "POST",
    data,
  });
  return data;
};

export const forgotPassword = async (data: forgotPasswordDTO) => {
  const res = await axiosInstance({
    name: "forgotPassword",
    method: "POST",
    data,
  });
  return res.data;
};

export const otp = async (data: otpDTO) => {
  const res = await axiosInstance({
    name: "otp",
    method: "POST",
    data,
  });
  return res.data;
};

export const newPassword = async (data: newPasswordDTO) => {
  const res = await axiosInstance({
    name: "resetPassword",
    method: "POST",
    data,
  });
  return res.data;
};
