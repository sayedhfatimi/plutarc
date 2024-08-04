import { useVault } from '@/Providers/VaultProvider';
import type { TAPIKey } from '@/lib/types/terminal/TAPIKey';
import { useState } from 'react';
import { LuAlertTriangle, LuTrash } from 'react-icons/lu';
import { toast } from 'sonner';
import DestructiveActionAlert from '../DestructiveActionAlert';

const ApiKeysDeleteButton = ({ apiKeyObj }: { apiKeyObj: TAPIKey }) => {
  const [isDeleting, setDeleting] = useState(false);
  const removeKey = useVault((state) => state.removeKey);

  const confirmDeleteApiKey = () => {
    setDeleting(true);

    removeKey(apiKeyObj);

    toast.warning('Key Deleted!', {
      description: `Deleted: ${apiKeyObj.label}`,
      icon: <LuAlertTriangle />,
      closeButton: true,
    });
    setDeleting(false);
  };

  return (
    <DestructiveActionAlert
      triggerDisabled={isDeleting}
      triggerIcon={LuTrash}
      alertDescription='This action cannot be undone. This will permanently delete this API key.'
      confirmTitle='DELETE!'
      confirmFn={confirmDeleteApiKey}
    />
  );
};

export default ApiKeysDeleteButton;
