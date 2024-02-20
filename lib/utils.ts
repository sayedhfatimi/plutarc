import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function gfwls(key: string) {
  if (typeof window !== "undefined")
    return JSON.parse(window.localStorage.getItem(key)!);
}
