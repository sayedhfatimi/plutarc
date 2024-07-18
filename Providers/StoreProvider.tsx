'use client';
import { initialiseState } from '@/lib/redux/features/apiKeys';
import { AppStore, makeStore } from '@/lib/redux/store';
import { TapiKey } from '@/lib/types/APIKeys';
import { useRef } from 'react';
import { Provider } from 'react-redux';

export default function StoreProvider({
  apiKeys,
  children,
}: {
  apiKeys: TapiKey[];
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
    storeRef.current.dispatch(initialiseState(apiKeys));
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
