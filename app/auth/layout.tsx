import QueryClientProvider from '@/Providers/QueryClientProvider';
import StoreProvider from '@/Providers/StoreProvider';
import { UserContextProvider } from '@/Providers/UserContextProvider';
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
          <Box className='p-1'>{children}</Box>
          <Toaster richColors />
        </QueryClientProvider>
      </UserContextProvider>
    </StoreProvider>
  );
}
