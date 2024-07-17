import type { NextAuthConfig } from 'next-auth';
import Resend from 'next-auth/providers/resend';
import Passkey from 'next-auth/providers/passkey';

export default {
  providers: [
    // Resend({
    //   from: 'no-reply@plutarc.io',
    // }),
    Passkey,
  ],
  experimental: { enableWebAuthn: true },
  trustHost: true,
} satisfies NextAuthConfig;
