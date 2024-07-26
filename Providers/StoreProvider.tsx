'use client';
import { initialiseState } from '@/lib/redux/features/apiKeys';
import {
  setEncryptedStatus,
  setPassphraseHash,
  setUserId,
  setUserProfileImage,
} from '@/lib/redux/features/userContext';
import { type AppStore, makeStore } from '@/lib/redux/store';
import type { TAPIKeys } from '@/lib/types/APIKeys';
import type { Session } from 'next-auth';
import { useRef } from 'react';
import { Provider } from 'react-redux';

export default function StoreProvider({
  apiKeys,
  userSession,
  children,
}: {
  apiKeys: TAPIKeys[];
  userSession: Session;
  children: React.ReactNode;
}) {
  // biome-ignore lint/correctness/noUnsafeOptionalChaining: Object is passed as proper from SSR Layout component into client component
  const { id, passphraseHash, image } = userSession?.user;

  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
    // initialise store
    if (id) storeRef.current.dispatch(setUserId(id));
    if (passphraseHash)
      storeRef.current.dispatch(setPassphraseHash(passphraseHash));
    if (image) storeRef.current.dispatch(setUserProfileImage(image));
    if (apiKeys.length !== 0)
      storeRef.current.dispatch(initialiseState(apiKeys));

    storeRef.current.dispatch(setEncryptedStatus(true));
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
