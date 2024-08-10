import axios, { AxiosError } from "axios";
import { error } from "console";

interface ErrorResponse {
  detail?: string;
  error?: string;
  message?: string;
  errors?: Record<string, string[]>;
}

export function handleApiError(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ErrorResponse>;

    if (axiosError.response) {
      const { data } = axiosError.response;

      if (data?.detail) return data.detail;
      if (data?.error) return data.error;
      if (data?.message) return data.message;
      if (data?.errors) return handleValidationError(data);

      switch (axiosError.response.status) {
        case 400:
          return "Invalid request. Please check your input and try again.";
        case 401:
          return "Authentication failed. Please log in again.";
        case 403:
          return "You don't have permission to access this resource.";
        case 404:
          return "The requested resource was not found.";
        case 422:
          return "Validation failed. Please check your input and try again.";
        case 500:
          return "An unexpected server error occurred. Please try again later.";
        default:
          return "An unexpected error occurred.";
      }
    } else if (axiosError.request) {
      return "No response received from the server. Please check your internet connection.";
    } else {
      return (
        axiosError.message || "An error occurred while setting up the request."
      );
    }
  }

  return error instanceof Error ? error.message : "An unknown error occurred.";
}

function handleValidationError(data: ErrorResponse): string {
  if (data.errors) {
    const errorMessages = Object.entries(data.errors)
      .map(([field, errors]) => `${field}: ${errors.join(", ")}`)
      .join("; ");
    return `Validation error: ${errorMessages}`;
  }
  return "Validation failed. Please check your input and try again.";
}
