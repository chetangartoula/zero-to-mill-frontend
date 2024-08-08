"use client";
import {
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import { useEffect } from "react";
import type { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { ApiRoutes } from "../constants/apiRoutes";
import { axiosInstance } from "./axios";
import { BaseApiResponse } from "@/types/global";

interface UseAppQueryOptions<ResponseData>
  extends Omit<UseQueryOptions<ResponseData>, "queryFn"> {
  routeName: ApiRoutes;
  onSuccess?: (data: ResponseData) => void;
  onError?: (error: Error) => void;
  requestConfig?: Omit<AxiosRequestConfig, "name">;
}

export type UseAppMutationOptions<
  ResponseData,
  Values = FieldValues,
  E = Error
> = Omit<UseMutationOptions<ResponseData, E, Values>, "mutationFn"> & {
  showFailureToast?: boolean;
};

export function useAppQuery<ResponseData>({
  routeName,
  onSuccess,
  onError,
  requestConfig,
  ...queryOptions
}: UseAppQueryOptions<ResponseData>) {
  const { isSuccess, data, isError, error, ...rest } = useQuery<
    ResponseData,
    Error
  >({
    ...queryOptions,
    queryKey: queryOptions.queryKey ?? [routeName],
    queryFn: async () => {
      try {
        const { data } = await axiosInstance<BaseApiResponse<ResponseData>>({
          name: routeName,
          method: "GET",
          ...requestConfig,
        });
        return data.data;
      } catch (err) {
        if (err instanceof Error) {
          throw err;
        } else {
          throw new Error("An unknown error occurred");
        }
      }
    },
  });

  useEffect(() => {
    if (isSuccess) onSuccess?.(data);
  }, [isSuccess, data, onSuccess]);

  useEffect(() => {
    if (isError) onError?.(error);
  }, [isError, error, onError]);

  return { isSuccess, data, isError, error, ...rest };
}

export function useAppMutation<ResponseData, Values = FieldValues, E = Error>(
  routeName: ApiRoutes,
  mutationOptions?: UseAppMutationOptions<ResponseData, Values, E>,
  requestConfig?: Omit<AxiosRequestConfig, "name">
) {
  const showFailureToast = mutationOptions?.showFailureToast ?? true;

  return useMutation({
    onError: (error) => {
      if (error instanceof Error && showFailureToast) {
        toast.error(error.message);
      }
    },
    ...mutationOptions,
    mutationKey: mutationOptions?.mutationKey ?? [routeName],
    mutationFn: async (value: Values) => {
      const { data } = await axiosInstance<BaseApiResponse<ResponseData>>({
        method: "POST",
        ...requestConfig,
        name: routeName,
        data: value,
      });

      return data.data;
    },
  });
}
