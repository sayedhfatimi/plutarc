import { ApiKeyEncryptedProvider } from '@/Providers/ApiKeyEncryptedProvider';
import { ApiKeyProvider } from '@/Providers/ApiKeyProvider';
import { DecryptApiKeyProvider } from '@/Providers/DecryptApiKeyProvider';
import QueryClientProvider from '@/Providers/QueryClientProvider';
import StoreProvider from '@/Providers/StoreProvider';
import NavBar from '@/components/NavBar';
import prisma from '@/prisma/client';
import { Box } from '@radix-ui/themes';
import { getServerSession } from 'next-auth';
import SetPassphrase from './_components/SetPassphrase';
import authOptions from './authOptions';
import { Toaster } from '@/components/ui/toaster';

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions); // get session data from server

  // get user info from db
  const userObj = await prisma.user.findUnique({
    where: { id: session!.user!.id },
  });

  // check if user has set a passphrase
  if (userObj?.passphraseHash === null) return <SetPassphrase />;

  // get the encrypted apiKeysArr from the db
  const encryptedApiKeysArr = await prisma.userAPICredentials.findMany({
    where: { userId: session!.user!.id },
  });

  return (
    <ApiKeyProvider encryptedApiKeysArr={encryptedApiKeysArr}>
      <ApiKeyEncryptedProvider>
        <StoreProvider>
          <DecryptApiKeyProvider
            passphraseHash={session!.user!.passphraseHash!}
            noKeys={encryptedApiKeysArr.length === 0}
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
