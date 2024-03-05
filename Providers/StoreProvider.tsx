'use client';
import { ApiKeyContext } from '@/lib/contexts/Contexts';
import { initialiseState } from '@/lib/redux/features/apiKeys/apiKeys';
import { AppStore, makeStore } from '@/lib/redux/store';
import { useContext, useRef } from 'react';
import { Provider } from 'react-redux';

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { apiKeysArr } = useContext(ApiKeyContext);

  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = makeStore();
    storeRef.current.dispatch(initialiseState(apiKeysArr));
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
