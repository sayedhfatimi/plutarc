import QueryClientProvider from '@/Providers/QueryClientProvider';
import { VaultProvider } from '@/Providers/VaultProvider';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function TerminalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (!session) redirect('/sign-in');

  return (
    <QueryClientProvider>
      <VaultProvider userSession={session}>{children}</VaultProvider>
    </QueryClientProvider>
  );
}
