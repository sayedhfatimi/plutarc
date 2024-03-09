'use client';
import { initialiseState } from '@/lib/redux/features/apiKeys/apiKeys';
import {
  setEncryptedStatus,
  setPassphraseHash,
  setUserId,
} from '@/lib/redux/features/user/userContext';
import { useAppDispatch } from '@/lib/redux/hooks';
import { UserContext } from '@/types/UserContextTypes';
import { UserAPIKeys } from '@prisma/client';

export function UserContextProvider({
  userId,
  passphraseHash,
  apiKeysArr,
  children,
}: {
  userId: UserContext['userId'];
  passphraseHash: UserContext['passphraseHash'];
  apiKeysArr: UserAPIKeys[];
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  if (userId) dispatch(setUserId(userId));
  if (passphraseHash) dispatch(setPassphraseHash(passphraseHash));
  if (apiKeysArr.length !== 0) dispatch(initialiseState(apiKeysArr));
  dispatch(setEncryptedStatus(true));

  return <>{children}</>;
}
