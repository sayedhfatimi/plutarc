import type { NextAuthConfig } from 'next-auth';
import Google from '@auth/core/providers/google';

export default {
  providers: [Google],
  trustHost: true,
} satisfies NextAuthConfig;
