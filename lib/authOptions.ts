import prisma from '@/prisma/client';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import TwitterProvider from 'next-auth/providers/twitter';
import CoinbaseProvider from 'next-auth/providers/coinbase';

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
    TwitterProvider({
      clientId: process.env.AUTH_TWITTER_ID!,
      clientSecret: process.env.AUTH_TWITTER_SECRET!,
      version: '2.0',
    }),
    CoinbaseProvider({
      clientId: process.env.AUTH_COINBASE_ID!,
      clientSecret: process.env.AUTH_COINBASE_SECRET!,
    }),
  ],
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
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default authOptions;
