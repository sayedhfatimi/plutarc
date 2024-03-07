import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      passphraseHash: string;
      publicAddress: string;
    } & DefaultSession['user'];
  }
}
