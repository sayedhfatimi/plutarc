import type { NextAuthConfig } from 'next-auth';

import Auth0Provider from '@auth/core/providers/auth0';

export default {
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_ID,
      clientSecret: process.env.AUTH0_SECRET,
      issuer: process.env.AUTH0_ISSUER,
    }),
  ],
  trustHost: true,
} satisfies NextAuthConfig;
