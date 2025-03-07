import { logout } from "@/store/actions/logout";
import axios, { AxiosError } from "axios";

interface ErrorResponse {
  detail?: string;
  error?: string;
  error_message?: string;
  message?: string;
  errors?: Record<string, string[]>;
}

const STATUS_ERRORS: Record<number, string> = {
  400: "Invalid request. Please check your input and try again.",
  401: "Authentication failed. Please log in again.",
  403: "You don't have permission to access this resource.",
  404: "The requested resource was not found.",
  422: "Validation failed. Please check your input and try again.",
  500: "An unexpected server error occurred. Please try again later.",
};

/**
 * Handles API errors and returns a user-friendly error message
 * @param error Unknown error object to process
 * @returns Formatted error message string
 */
export function handleApiError(error: unknown): string {
  if (!axios.isAxiosError(error)) {
    return error instanceof Error
      ? error.message
      : "An unknown error occurred.";
  }

  const axiosError = error as AxiosError<ErrorResponse>;

  if (!axiosError.response) {
    return axiosError.request
      ? "No response received from the server. Please check your internet connection."
      : axiosError.message || "An error occurred while setting up the request.";
  }

  const { status, data } = axiosError.response;

  if (status === 401) {
    logout();
    return STATUS_ERRORS[401];
  }

  const errorMessage =
    data?.error_message ??
    data?.detail ??
    data?.error ??
    data?.message ??
    (data?.errors && handleValidationError(data.errors)) ??
    STATUS_ERRORS[status] ??
    "An unexpected error occurred.";

  return errorMessage;
}

/**
 * Formats validation errors into a readable string
 * @param errors Validation error object
 * @returns Formatted validation error message
 */
function handleValidationError(errors: Record<string, string[]>): string {
  if (!errors || !Object.keys(errors).length) {
    return "Validation failed. Please check your input and try again.";
  }

  const errorMessages = Object.entries(errors)
    .map(([field, errorList]) => `${field}: ${errorList.join(", ")}`)
    .join("; ");

  return `Validation error: ${errorMessages}`;
}
