import NextAuth from 'next-auth';
import authConfig from '@/lib/auth/auth.config';
export default NextAuth(authConfig).auth;

export const { auth: middleware } = NextAuth(authConfig);
