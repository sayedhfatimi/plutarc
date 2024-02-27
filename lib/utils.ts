import { clsx, type ClassValue } from 'clsx';
import { Gugi } from 'next/font/google';
import { twMerge } from 'tailwind-merge';

export const gugiFont = Gugi({ subsets: ['latin'], weight: ['400'] });

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function gfwls(key: string) {
  if (typeof window !== 'undefined')
    return JSON.parse(window.localStorage.getItem(key)!);
}
