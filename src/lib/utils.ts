import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function truncateText(text: string, maxChars: number): string {
  if (text.length <= maxChars) return text;
  const truncated = text.slice(0, maxChars).trim();
  const lastSpaceIndex = truncated.lastIndexOf(" ");
  const result =
    lastSpaceIndex > 0 ? truncated.slice(0, lastSpaceIndex) : truncated;
  return `${result}…`;
}
