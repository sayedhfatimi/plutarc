import { ApiKeyProvider } from '@/Providers/ApiKeyProvider';
import QueryClientProvider from '@/Providers/QueryClientProvider';
import StoreProvider from '@/Providers/StoreProvider';
import NavBar from '@/app/auth/_components/NavBar';
import { Toaster } from '@/components/ui/toaster';
import { getApiKeys, getUserObj } from '@/lib/_actions';
import { Box } from '@radix-ui/themes';
import SetPassphrase from './_components/SetPassphrase';

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // get user info from db
  const { userObj } = await getUserObj();

  // check if user has set a passphrase, if not block UI render return SetPassphrase component
  if (userObj?.passphraseHash === null) return <SetPassphrase />;

  // get the encrypted apiKeysArr from the db
  const { apiKeys } = await getApiKeys();

  return (
    <StoreProvider>
      <ApiKeyProvider
        apiKeysArr={apiKeys!}
        passphraseHash={userObj?.passphraseHash!}
        noKeys={apiKeys!.length === 0}
      >
        <QueryClientProvider>
          <NavBar />
          <Box p='1' className=''>
            {children}
          </Box>
          <Toaster />
        </QueryClientProvider>
      </ApiKeyProvider>
    </StoreProvider>
  );
}
