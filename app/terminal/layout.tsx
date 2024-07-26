import QueryClientProvider from '@/Providers/QueryClientProvider';
import StoreProvider from '@/Providers/StoreProvider';
import { getApiKeys } from '@/lib/actions';
import { auth } from '@/lib/auth';
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
    <QueryClientProvider>
      <StoreProvider apiKeys={apiKeyArr!} userSession={session}>
        {children}
      </StoreProvider>
    </QueryClientProvider>
  );
}
