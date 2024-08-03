'use client';
import { useVault } from '@/Providers/VaultProvider';
import ApiKeysAddForm from './ApiKeysAddForm';
import ApiKeysDecryptionDialog from './ApiKeysDecryptionDialog';

const ApiKeysAddDialog = () => {
  const apiKeys = useVault((state) => state.APIKeys);
  const isEncrypted = useVault((state) => state.terminal.isEncrypted);
  if (isEncrypted && apiKeys.length !== 0) return <ApiKeysDecryptionDialog />;

  return <ApiKeysAddForm />;
};

export default ApiKeysAddDialog;
