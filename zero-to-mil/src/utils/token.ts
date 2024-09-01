import { axiosInstance } from "@/lib/axios";
import { isSSR } from "./ssr";

export const setRefreshToken = (accessToken: string) => {
  const isServer = isSSR();
  console.log("isServer", isServer);

  if (isServer) {
    throw new Error("This function should not be called on the server");
  }
  localStorage.setItem("token", accessToken);
};

export const getRefreshToken = () => {
  const isServer = isSSR();

  if (isServer) {
    throw new Error("This function should not be called on the server");
  }
  return localStorage.getItem("token");
};

export const setAxiosAuthTokens = ({
  accessToken,
}: {
  accessToken: string;
}) => {
  axiosInstance.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${accessToken}`;
};

export const clearAxiosAuthTokens = () => {
  delete axiosInstance.defaults.headers.common["Authorization"];
};
