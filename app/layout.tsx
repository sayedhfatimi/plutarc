import '@/app/globals.css';
import AuthProvider from '@/Providers/AuthProvider';
import { ThemeProvider } from '@/Providers/ThemeProvider';
import { Toaster } from '@/components/ui/sonner';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import Head from 'next/head';
import Script from 'next/script';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Plutarc Trading Terminal',
  description: 'all-in-one trading platform',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={cn('bg-background font-sans antialiased', fontSans.variable)}
      >
        <Head>
          <Script
            defer
            data-domain='plutarc.io'
            src='https://orichalcum.plutarc.io/js/script.js'
            key='orichalcum'
          />
        </Head>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          <AuthProvider>
            {children}
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
