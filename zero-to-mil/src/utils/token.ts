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
