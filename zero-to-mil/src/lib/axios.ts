import { apiRoutes } from "@/constants/apiRoutes";
import { getApiRoutes } from "@/utils/getRoutes";
import axios, { AxiosRequestConfig } from "axios";

declare module "axios" {
  interface AxiosRequestConfig {
    name?: keyof typeof apiRoutes;
    modifier?: Record<string, string>;
  }
}

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 1000 * 30,
});

axiosInstance.interceptors.request.use(
  function (config) {
    if (config.name) {
      config.url = getApiRoutes(config.name ?? "", config.modifier);
    }
    return config;
  },
  function (error: Error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
