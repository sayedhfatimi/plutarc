import { ApiKeyEncryptedProvider } from '@/Providers/ApiKeyEncryptedProvider';
import { ApiKeyProvider } from '@/Providers/ApiKeyProvider';
import { DecryptApiKeyProvider } from '@/Providers/DecryptApiKeyProvider';
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

  // check if user has set a passphrase
  if (userObj?.passphraseHash === null) return <SetPassphrase />;

  // get the encrypted apiKeysArr from the db
  const { apiKeys } = await getApiKeys();

  return (
    <ApiKeyProvider encryptedApiKeysArr={apiKeys!}>
      <ApiKeyEncryptedProvider>
        <StoreProvider>
          <DecryptApiKeyProvider
            passphraseHash={userObj?.passphraseHash!}
            noKeys={apiKeys!.length === 0}
          >
            <QueryClientProvider>
              <NavBar />
              <Box p='2'>{children}</Box>
              <Toaster />
            </QueryClientProvider>
          </DecryptApiKeyProvider>
        </StoreProvider>
      </ApiKeyEncryptedProvider>
    </ApiKeyProvider>
  );
}
