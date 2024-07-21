import CryptoJS from 'crypto-js';

export const encryptString = (plaintext: string, passphrase: string) =>
  CryptoJS.AES.encrypt(plaintext, passphrase).toString();

export const decryptString = (hash: string, passphrase: string) =>
  CryptoJS.AES.decrypt(hash, passphrase).toString(CryptoJS.enc.Utf8);
