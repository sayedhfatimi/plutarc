import StoreProvider from '@/Providers/StoreProvider';
import QueryClientProvider from '@/Providers/QueryClientProvider';
import NavBar from '@/components/NavBar';
import { Box } from '@radix-ui/themes';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <QueryClientProvider>
        <NavBar />
        <Box p='2'>{children}</Box>
      </QueryClientProvider>
    </StoreProvider>
  );
}
