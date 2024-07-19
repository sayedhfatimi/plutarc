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
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button size='sm' variant='destructive' disabled={isDeleting}>
            <LuTrash size='16' />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this
              API key.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction asChild className='bg-red-800 hover:bg-red-600'>
              <Button onClick={confirmDeleteApiKey} className='space-x-2'>
                <LuBomb size='16' />
                <span>DELETE!</span>
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog open={error}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Error</AlertDialogTitle>
            <AlertDialogDescription>
              An error occurred whilst attempting to delete. Please contact
              support.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setError(false)}>
              Close
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ApiKeysDeleteButton;
