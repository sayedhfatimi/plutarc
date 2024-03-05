import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from '../prisma';
import authConfig from './auth.config';

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.AUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async session({ session, token }) {
      const userObj = await prisma.user.findUnique({
        where: { id: token.sub },
      });

      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub,
          passphraseHash: userObj?.passphraseHash,
        },
      };
    },
    async jwt({ token }) {
      return token;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const paths = ['/auth'];
      const isProtected = paths.some((path) =>
        nextUrl.pathname.startsWith(path),
      );

      if (isProtected && !isLoggedIn) {
        const redirectUrl = new URL('login', nextUrl.origin);
        redirectUrl.searchParams.append('callbackUrl', nextUrl.href);
        return Response.redirect(redirectUrl);
      }

      return true;
    },
  },
  session: {
    strategy: 'jwt',
  },
  ...authConfig,
});
