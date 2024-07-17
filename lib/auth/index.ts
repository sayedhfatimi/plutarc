import { db } from '@/lib/db';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import NextAuth from 'next-auth';
import Passkey from 'next-auth/providers/passkey';
import Resend from 'next-auth/providers/resend';

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [
    Resend({
      from: 'no-reply@plutarc.io',
    }),
    Passkey,
  ],
  experimental: { enableWebAuthn: true },
  trustHost: true,
  session: {
    strategy: 'jwt',
  },
});
