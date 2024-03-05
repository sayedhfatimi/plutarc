import Google from 'next-auth/providers/google';
import Twitter from 'next-auth/providers/twitter';
import CredentialsProvider from 'next-auth/providers/credentials';

import type { NextAuthConfig } from 'next-auth';
import authorizeCrypto from './authorizeCrypto';

export default {
  providers: [
    Google,
    Twitter,
    CredentialsProvider({
      id: 'crypto',
      name: 'Crypto Wallet Auth',
      credentials: {
        publicAddress: { label: 'Public Address', type: 'text' },
        signedNonce: { label: 'Signed Nonce', type: 'text' },
      },
      authorize: authorizeCrypto,
    }),
  ],
} satisfies NextAuthConfig;
