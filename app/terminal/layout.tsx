import StoreProvider from '@/Providers/StoreProvider';

export default function TerminalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <StoreProvider>{children}</StoreProvider>;
}
