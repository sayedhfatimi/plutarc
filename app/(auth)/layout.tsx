import QueryClientProvider from '@/Providers/QueryClientProvider';
import StoreProvider from '@/Providers/StoreProvider';
import NavBar from '@/components/NavBar';
import prisma from '@/prisma/client';
import { Box } from '@radix-ui/themes';
import { getServerSession } from 'next-auth';
import SetPassphrase from './_components/SetPassphrase';
import authOptions from './authOptions';

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  const userObj = await prisma.user.findUnique({
    where: { id: session!.user!.id },
  });

  if (userObj?.encryptionKey === null) return <SetPassphrase />;

  const apiKeysObj = await prisma.userAPICredentials.findMany({
    where: { userId: session!.user!.id },
  });

  return (
    <StoreProvider apiKeysObj={apiKeysObj}>
      <QueryClientProvider>
        <NavBar />
        <Box p='2'>{children}</Box>
      </QueryClientProvider>
    </StoreProvider>
  );
}
