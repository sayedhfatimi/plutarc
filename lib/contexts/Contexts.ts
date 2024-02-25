import { UserAPICredentials } from '@prisma/client';
import { createContext } from 'react';

type ApiKeyContext = {
  apiKeysArr: UserAPICredentials[];
  setApiKeysArr: React.Dispatch<React.SetStateAction<UserAPICredentials[]>>;
};

type ApiKeyEncryptedContext = {
  isEncrypted: boolean;
  setEncrypted: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ApiKeyContext = createContext<ApiKeyContext>(null!);
export const ApiKeyEncryptedContext = createContext<ApiKeyEncryptedContext>(
  null!,
);
