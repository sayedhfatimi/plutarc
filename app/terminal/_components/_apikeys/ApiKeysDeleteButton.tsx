import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { deleteApiKey } from '@/lib/actions';
import { removeApiKey } from '@/lib/redux/features/apiKeys';
import { useAppDispatch } from '@/lib/redux/hooks';
import { type TAPIKeys } from '@/lib/types/APIKeys';
import { useState } from 'react';
import { LuAlertTriangle, LuBomb, LuTrash } from 'react-icons/lu';
import { toast } from 'sonner';
import ErrorDialog from '../ErrorDialog';
import DestructiveActionAlert from '../DestructiveActionAlert';

const ApiKeysDeleteButton = ({ apiKeyObj }: { apiKeyObj: TAPIKeys }) => {
  const [error, setError] = useState(false);
  const [isDeleting, setDeleting] = useState(false);

  const dispatch = useAppDispatch();

  const confirmDeleteApiKey = async () => {
    try {
      setDeleting(true);
      await deleteApiKey(apiKeyObj.id);

      dispatch(removeApiKey(apiKeyObj));

      toast.warning('Key Deleted!', {
        description: `Deleted: ${apiKeyObj.label}`,
        icon: <LuAlertTriangle />,
        closeButton: true,
      });
      setDeleting(false);
    } catch (error) {
      setDeleting(false);
      setError(true);
      toast.error('An unknown error has occurred.', {
        icon: <LuAlertTriangle />,
        closeButton: true,
      });
    }
  };

  return (
    <>
      <DestructiveActionAlert
        triggerDisabled={isDeleting}
        triggerIcon={LuTrash}
        alertDescription='This action cannot be undone. This will permanently delete this API key.'
        confirmTitle='DELETE!'
        confirmFn={confirmDeleteApiKey}
      />
      <ErrorDialog error={error} setError={setError} />
    </>
  );
};

export default ApiKeysDeleteButton;
