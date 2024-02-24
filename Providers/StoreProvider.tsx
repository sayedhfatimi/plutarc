'use client';
import { AppStore, makeStore } from '@/lib/redux/store';
import { UserAPICredentials } from '@prisma/client';
import { useRef } from 'react';
import { Provider } from 'react-redux';

export default function StoreProvider({
  apiKeysObj,
  children,
}: {
  apiKeysObj: UserAPICredentials[];
  children: React.ReactNode;
}) {
  window.localStorage.setItem('userApiCredentials', JSON.stringify(apiKeysObj));

  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
