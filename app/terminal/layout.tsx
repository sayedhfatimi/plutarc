import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { apiKeys } from '@/lib/db/schema';
import StoreProvider from '@/Providers/StoreProvider';
import { eq } from 'drizzle-orm';

export default async function TerminalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (!session) return;

  const userId = session?.user?.id;
  console.log(userId);
  if (!userId) return;

  const apiKeysArr = await db
    .select()
    .from(apiKeys)
    .where(eq(apiKeys.userId, userId));

  return <StoreProvider apiKeys={apiKeysArr}>{children}</StoreProvider>;
}
