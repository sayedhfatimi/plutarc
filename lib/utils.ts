import { type ClassValue, clsx } from 'clsx';
import CryptoJS from 'crypto-js';
import { Gugi } from 'next/font/google';
import { twMerge } from 'tailwind-merge';

export const gugiFont = Gugi({ subsets: ['latin'], weight: ['400'] });

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const encryptString = (plaintext: string, passphrase: string) =>
  CryptoJS.AES.encrypt(plaintext, passphrase).toString();

export const decryptString = (hash: string, passphrase: string) =>
  CryptoJS.AES.decrypt(hash, passphrase).toString(CryptoJS.enc.Utf8);
