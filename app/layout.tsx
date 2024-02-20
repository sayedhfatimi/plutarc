import { ThemeProvider } from "@/Providers/ThemeProvider";
import NavBar from "@/components/NavBar";
import { cn } from "@/lib/utils";
import { Box, Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import QueryClientProvider from "../Providers/QueryClientProvider";
import AuthProvider from "./auth/Provider";
import "./globals.css";
import { useContext } from "react";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "plutarc",
  description: "all-in-one trading platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <QueryClientProvider>
          <AuthProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Theme>
                <NavBar />
                <Box p="2">{children}</Box>
              </Theme>
            </ThemeProvider>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
