'use client';
import DecryptApiKeys from '@/app/auth/_components/DecryptApiKeys';
import { useAppSelector } from '@/lib/redux/hooks';
import { UserAPICredentials } from '@prisma/client';

export function ApiKeyProvider({
  noKeys,
  passphraseHash,
  apiKeysArr,
  children,
}: {
  noKeys: boolean;
  passphraseHash: string;
  apiKeysArr: UserAPICredentials[];
  children: React.ReactNode;
}) {
  const isEncrypted = useAppSelector((state) => state.encryptedStatus);

  if (!noKeys && isEncrypted)
    return (
      <DecryptApiKeys passphraseHash={passphraseHash} apiKeysArr={apiKeysArr} />
    );

  return <>{children}</>;
}
