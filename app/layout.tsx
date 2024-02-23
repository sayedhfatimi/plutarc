import { ThemeProvider } from '@/Providers/ThemeProvider';
import NavBar from '@/components/NavBar';
import { cn } from '@/lib/utils';
import { Box, Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import AuthProvider from './(auth)/Provider';
import './globals.css';

export const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'plutarc',
  description: 'all-in-one trading platform',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable,
        )}
      >
        <AuthProvider>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
          >
            <Theme>{children}</Theme>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
