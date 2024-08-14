import { axiosInstance } from "@/lib/axios";
import { isSSR } from "./ssr";

export const setAccessToken = (accessToken: string) => {
  const isServer = isSSR();
  console.log("isServer", isServer);

  if (isServer) {
    throw new Error("This function should not be called on the server");
  }
  localStorage.setItem("accessToken", accessToken);
};

export function setRefreshToken(token: string): void {
  const expires = new Date();
  expires.setTime(expires.getTime() + 7 * 24 * 60 * 60 * 1000); // 7 days in milliseconds
  document.cookie = `refreshToken=${token}; Secure; SameSite=Strict; Expires=${expires.toUTCString()}; Path=/`;
}

export function getRefreshToken(): string | null {
  const cookies = document.cookie.split("; ");
  const refreshToken = cookies.find((cookie) =>
    cookie.startsWith("refreshToken=")
  );
  return refreshToken ? refreshToken.split("=")[1] : null;
}

export const getAccessToken = () => {
  const isServer = isSSR();

  console.log("isServer", isServer);

  if (isServer) {
    throw new Error("This function should not be called on the server");
  }

  return localStorage.getItem("accessToken");
};

export function removeTokens(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem("accessToken");
  }
  document.cookie =
    "refreshToken=; Max-Age=0; path=/; HttpOnly; Secure; SameSite=Strict";
}

export const setTokens = ({
  accessToken,
  refreshToken,
}: {
  accessToken: string;
  refreshToken: string;
}) => {
  console.log("isServer", "hihi");

  setAccessToken(accessToken);
  setRefreshToken(refreshToken);
};

export const setAxiosAuthTokens = ({
  accessToken,
  refreshToken,
}: {
  accessToken: string;
  refreshToken: string;
}) => {
  axiosInstance.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${accessToken}`;
  axiosInstance.defaults.headers.common["Refresh"] = refreshToken;
};

export const clearAxiosAuthTokens = () => {
  delete axiosInstance.defaults.headers.common["Authorization"];
  delete axiosInstance.defaults.headers.common["Refresh"];
};
