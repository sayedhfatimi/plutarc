'use client';
import { initialiseState } from '@/lib/redux/features/apiKeys';
import {
  setEncryptedStatus,
  setPassphraseHash,
  setUserId,
} from '@/lib/redux/features/userContext';
import { AppStore, makeStore } from '@/lib/redux/store';
import { TAPIKeys } from '@/lib/types/APIKeys';
import { useRef } from 'react';
import { Provider } from 'react-redux';

export default function StoreProvider({
  apiKeys,
  passphraseHash,
  userId,
  children,
}: {
  apiKeys: TAPIKeys[];
  passphraseHash: string;
  userId: string;
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
    // initialise store
    if (userId) storeRef.current.dispatch(setUserId(userId));
    if (passphraseHash)
      storeRef.current.dispatch(setPassphraseHash(passphraseHash));
    if (apiKeys.length !== 0)
      storeRef.current.dispatch(initialiseState(apiKeys));

    storeRef.current.dispatch(setEncryptedStatus(true));
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
