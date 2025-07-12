import { format } from "date-fns";

export const convertUTCToLocal = (
  utcDateString: string,
  formatString: string = "yyyy MMMM dd, HH:mm"
) => {
  if (utcDateString === undefined || utcDateString === "") return "-";
  const date = new Date(utcDateString);
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date string");
  }
  return format(date, formatString);
};
