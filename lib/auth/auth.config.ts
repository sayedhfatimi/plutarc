import type { NextAuthConfig } from 'next-auth';
import Resend from 'next-auth/providers/resend';

export default {
  providers: [
    Resend({
      from: 'no-reply@plutarc.io',
    }),
  ],
  trustHost: true,
} satisfies NextAuthConfig;
