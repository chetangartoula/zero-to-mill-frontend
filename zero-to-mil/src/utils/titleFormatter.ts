export function formatLabel(str: string, separator: string = " "): string {
  if (!str) return "";
  if (str === "yesNo") return "Yes/No";
  if (str === "overUnder") return "Over/Under";

  let formatted = str.replace(/[_-]/g, separator);

  if (separator !== " ") {
    formatted = formatted.replace(/([a-z])([A-Z])/g, `$1${separator}$2`);
  } else {
    formatted = formatted.replace(/([a-z])([A-Z])/g, "$1 $2");
  }

  formatted = formatted
    .split(separator)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(separator);

  return formatted;
}
