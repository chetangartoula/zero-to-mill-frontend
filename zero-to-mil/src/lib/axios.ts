import { apiRoutes } from "@/constants/apiRoutes";
import { handleApiError } from "@/utils/error";
import { getApiRoutes } from "@/utils/getRoutes";
import axios from "axios";

declare module "axios" {
  interface AxiosRequestConfig {
    name?: keyof typeof apiRoutes;
    modifier?: Record<string, string> | ((data: any) => Record<string, string>);
  }
}

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 1000 * 30,
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (config.name) {
      const modifier =
        typeof config.modifier === "function"
          ? config.modifier(config.data)
          : config.modifier;
      config.url = config.url ?? getApiRoutes(config.name, modifier);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("error", error);
    return Promise.reject(handleApiError(error));
  }
);
