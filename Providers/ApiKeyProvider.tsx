'use client';
import { ApiKeyContext } from '@/lib/contexts/Contexts';
import { UserAPICredentials } from '@prisma/client';
import { useState } from 'react';

export function ApiKeyProvider({
  encryptedApiKeysArr,
  children,
}: {
  encryptedApiKeysArr: UserAPICredentials[];
  children: React.ReactNode;
}) {
  const [apiKeysArr, setApiKeysArr] =
    useState<UserAPICredentials[]>(encryptedApiKeysArr);

  return (
    <ApiKeyContext.Provider value={{ apiKeysArr, setApiKeysArr }}>
      {children}
    </ApiKeyContext.Provider>
  );
}
