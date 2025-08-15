import { format } from "date-fns";

export function getJWTExpiry(token: string) {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) throw new Error("Invalid JWT format");
    const payload = JSON.parse(atob(parts[1]));

    if (payload.exp)
      return format(new Date(payload.exp * 1000), "yyyy-MM-dd HH:mm");
    return null;
  } catch (error) {
    console.error("Error decoding JWT:", error);
    return null;
  }
}
