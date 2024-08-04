'use client';
import { type TVault, createVault } from '@/lib/vault';
import type { Session } from 'next-auth';
import { type ReactNode, createContext, useContext, useRef } from 'react';
import { useStore } from 'zustand';

export type TVaultApi = ReturnType<typeof createVault>;

export const VaultContext = createContext<TVaultApi | undefined>(undefined);

export const VaultProvider = ({
  children,
  userSession,
}: { children: ReactNode; userSession: Session }) => {
  const vaultRef = useRef<TVaultApi>();
  if (!vaultRef.current) {
    vaultRef.current = createVault(userSession.user.id);
  }

  return (
    <VaultContext.Provider value={vaultRef.current}>
      {children}
    </VaultContext.Provider>
  );
};

export const useVault = <T,>(selector: (store: TVault) => T): T => {
  const vaultContext = useContext(VaultContext);

  if (!vaultContext) {
    throw new Error('useVault must be used within VaultProvider');
  }

  return useStore(vaultContext, selector);
};
