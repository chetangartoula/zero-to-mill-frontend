import { axiosService } from "@/lib/axios";
import { isSSR } from "./ssr";
export const getAuthTokens = () => {
  const isServer = isSSR();
  if (isServer) {
    throw new Error("This function should not be called on the server");
  }

  return {
    accessToken: localStorage.getItem("accessToken"),
    refreshToken: localStorage.getItem("refreshToken"),
  };
};

export const setAuthTokens = ({
  accessToken,
  refreshToken,
}: {
  accessToken: string;
  refreshToken: string;
}) => {
  const isServer = isSSR();
  if (isServer) {
    throw new Error("This function should not be called on the server");
  }

  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
};

export const clearAuthTokens = () => {
  const isServer = isSSR();
  if (isServer) {
    throw new Error("This function should not be called on the server");
  }

  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

export const setAxiosAuthTokens = ({
  accessToken,
  refreshToken,
}: {
  accessToken: string;
  refreshToken: string;
}) => {
  axiosService.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${accessToken}`;
  axiosService.defaults.headers.common["Refresh"] = refreshToken;
};

export const clearAxiosAuthTokens = () => {
  delete axiosService.defaults.headers.common["Authorization"];
  delete axiosService.defaults.headers.common["Refresh"];
};
