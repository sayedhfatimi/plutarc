'use client';
import DecryptApiKeys from '@/app/auth/_components/DecryptApiKeys';
import { ApiKeyEncryptedContext } from '@/lib/contexts/Contexts';
import { useContext } from 'react';

export function DecryptApiKeyProvider({
  noKeys,
  passphraseHash,
  children,
}: {
  noKeys: boolean;
  passphraseHash: string;
  children: React.ReactNode;
}) {
  const { isEncrypted } = useContext(ApiKeyEncryptedContext);

  if (!noKeys && isEncrypted)
    return <DecryptApiKeys passphraseHash={passphraseHash} />;

  return <>{children}</>;
}
