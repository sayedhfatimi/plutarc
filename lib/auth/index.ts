import { db } from '@/lib/db';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { eq } from 'drizzle-orm';
import NextAuth from 'next-auth';
import type { Provider } from 'next-auth/providers';
import Passkey from 'next-auth/providers/passkey';
import Resend from 'next-auth/providers/resend';
import { users } from '../db/schema';

const providers: Provider[] = [
  Resend({
    from: 'no-reply@plutarc.io',
  }),
  Passkey,
];

export const providerMap = providers.map((provider) => {
  if (typeof provider === 'function') {
    const providerData = provider();
    return { id: providerData.id, name: providerData.name };
  }
  return { id: provider.id, name: provider.name };
});

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db),
  providers,
  experimental: { enableWebAuthn: true },
  trustHost: true,
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/sign-in',
    signOut: '/sign-out',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const paths = ['/terminal'];
      const isProtected = paths.some((path) =>
        nextUrl.pathname.startsWith(path),
      );

      if (isProtected && !isLoggedIn) {
        const redirectUrl = new URL('sign-in', nextUrl.origin);
        redirectUrl.searchParams.append('callbackUrl', nextUrl.href);
        return Response.redirect(redirectUrl);
      }

      return true;
    },
    async session({ session, token }) {
      const user = await db
        .select()
        .from(users)
        // biome-ignore lint/style/noNonNullAssertion: <explanation>
        .where(eq(users.id, token.sub!))
        .limit(1);

      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub,
          passphraseHash: user[0].passphraseHash,
        },
      };
    },
    async jwt({ token }) {
      return token;
    },
  },
});
