'use client';
import { useAppSelector } from '@/lib/redux/hooks';
import ApiKeysAddForm from './ApiKeysAddForm';
import ApiKeysDecryptionDialog from './ApiKeysDecryptionDialog';

const ApiKeysAddDialog = () => {
  const apiKeys = useAppSelector((state) => state.apiKeys);
  const isEncrypted = useAppSelector((state) => state.userContext.isEncrypted);
  if (isEncrypted && apiKeys.length !== 0) return <ApiKeysDecryptionDialog />;

  return <ApiKeysAddForm />;
};

export default ApiKeysAddDialog;
