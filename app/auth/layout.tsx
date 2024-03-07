import QueryClientProvider from '@/Providers/QueryClientProvider';
import StoreProvider from '@/Providers/StoreProvider';
import { UserContextProvider } from '@/Providers/UserContextProvider';
import NavBar from '@/app/auth/_components/NavBar';
import { Toaster } from '@/components/ui/sonner';
import { getApiKeys, getUser } from '@/lib/_actions';
import { Box } from '@radix-ui/themes';

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // get user info from db
  const { user } = await getUser();

  // get the encrypted apiKeysArr from the db
  const { apiKeys } = await getApiKeys();

  return (
    <StoreProvider>
      <UserContextProvider
        userId={user?.id!}
        apiKeysArr={apiKeys!}
        passphraseHash={user?.passphraseHash!}
      >
        <QueryClientProvider>
          <NavBar />
          <Box p='1' className=''>
            {children}
          </Box>
          <Toaster />
        </QueryClientProvider>
      </UserContextProvider>
    </StoreProvider>
  );
}
