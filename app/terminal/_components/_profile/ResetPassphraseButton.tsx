'use client';
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
import { resetPassphrase } from '@/lib/actions';
import { useAppSelector } from '@/lib/redux/hooks';
import { useState } from 'react';
import { LuAlertTriangle, LuBomb } from 'react-icons/lu';
import { toast } from 'sonner';

const ResetPassphraseButton = () => {
  const [error, setError] = useState(false);
  const [isDeleting, setDeleting] = useState(false);
  const passphraseHash = useAppSelector(
    (state) => state.userContext.passphraseHash,
  );

  const confirmResetPassphrase = async () => {
    try {
      setDeleting(true);

      await resetPassphrase();
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
          <Button
            variant='destructive'
            disabled={isDeleting || passphraseHash === undefined}
          >
            <LuAlertTriangle className='mr-2 h-4 w-4' />
            Reset Passphrase
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              On confirmation, your passphrase will be reset and all associated
              API keys deleted from the server, you will be automatically logged
              out and will need to log back in again.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <span className='text-red-600'>
            This action cannot be undone. This will reset your passphrase and
            delete all API keys associated with this account.
          </span>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction asChild className='bg-red-800 hover:bg-red-600'>
              <Button onClick={confirmResetPassphrase} className='space-x-2'>
                <LuBomb size='16' />
                <span>RESET PASSPHRASE!</span>
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
              An error occurred whilst attempting this action. Please contact
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

export default ResetPassphraseButton;
