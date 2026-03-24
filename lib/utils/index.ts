import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind and conditional class names into a single string.
 *
 * @param inputs - Conditional class name values
 */
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

/**
 * Formats a number into a compact human-readable value.
 *
 * @param value - The numeric value to format
 */
export const formatCompactNumber = (value: number) =>
  new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 1,
    notation: "compact",
  }).format(value);

/**
 * Formats an ISO date string into a short readable date.
 *
 * @param value - The ISO date string to format
 * @param options - Optional Intl formatting overrides
 */
export const formatDate = (
  value: string,
  options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  }
) => new Intl.DateTimeFormat("en-US", options).format(new Date(value));

/**
 * Formats an ISO date string into a date and time label.
 *
 * @param value - The ISO date string to format
 */
export const formatDateTime = (value: string) =>
  formatDate(value, {
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    month: "short",
  });

/**
 * Formats an ISO date string into a compact relative-time label.
 *
 * @param value - The ISO date string to format
 */
export const formatRelativeTime = (value: string) => {
  const date = new Date(value);
  const now = Date.now();
  const diffInSeconds = Math.round((date.getTime() - now) / 1000);
  const formatter = new Intl.RelativeTimeFormat("en", {
    numeric: "auto",
  });

  const ranges: [Intl.RelativeTimeFormatUnit, number][] = [
    ["year", 60 * 60 * 24 * 365],
    ["month", 60 * 60 * 24 * 30],
    ["day", 60 * 60 * 24],
    ["hour", 60 * 60],
    ["minute", 60],
  ];

  for (const [unit, secondsInUnit] of ranges) {
    if (Math.abs(diffInSeconds) >= secondsInUnit) {
      return formatter.format(Math.round(diffInSeconds / secondsInUnit), unit);
    }
  }

  return formatter.format(diffInSeconds, "second");
};

/**
 * Returns initials for avatar fallbacks and compact identity labels.
 *
 * @param value - The source display name
 */
export const getInitials = (value: string) =>
  value
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.at(0)?.toUpperCase() ?? "")
    .join("");
