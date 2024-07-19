import { getApiKeys } from '@/lib/actions';
import { auth } from '@/lib/auth';
import StoreProvider from '@/Providers/StoreProvider';
import { redirect } from 'next/navigation';

export default async function TerminalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (!session) redirect('/sign-in');

  const { apiKeyArr } = await getApiKeys();

  return (
    <StoreProvider
      apiKeys={apiKeyArr!}
      passphraseHash={session.user.passphraseHash}
      userId={session.user.id}
    >
      {children}
    </StoreProvider>
  );
}
