'use client';
import { useVault } from '@/Providers/VaultProvider';
import ApiKeysAddForm from './ApiKeysAddForm';
import ApiKeysDecryptionDialog from './ApiKeysDecryptionDialog';

const ApiKeysAddDialog = () => {
  const eAPIKeys = useVault((state) => state.eAPIKeys);
  const dAPIKeys = useVault((state) => state.dAPIKeys);
  if (eAPIKeys.length > 0 && dAPIKeys.length === 0)
    return <ApiKeysDecryptionDialog />;

  return <ApiKeysAddForm />;
};

export default ApiKeysAddDialog;
