import { axiosInstance } from "@/lib/axios";
import { isSSR } from "./ssr";

export const setAccessToken = (accessToken: string) => {
  const isServer = isSSR();
  console.log("isServer", isServer);

  if (isServer) {
    throw new Error("This function should not be called on the server");
  }
  sessionStorage.setItem("accessToken", accessToken);
};

export const getAccessToken = () => {
  const isServer = isSSR();

  if (isServer) {
    throw new Error("This function should not be called on the server");
  }
  return sessionStorage.getItem("accessToken");
};

export function removeTokens(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem("accessToken");
  }
  document.cookie =
    "refreshToken=; Max-Age=0; path=/; HttpOnly; Secure; SameSite=Strict";
}

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
