'use client';
import { ApiKeyEncryptedContext } from '@/lib/contexts/Contexts';
import { useState } from 'react';

export function ApiKeyEncryptedProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isEncrypted, setEncrypted] = useState<boolean>(true);

  return (
    <ApiKeyEncryptedContext.Provider value={{ isEncrypted, setEncrypted }}>
      {children}
    </ApiKeyEncryptedContext.Provider>
  );
}
