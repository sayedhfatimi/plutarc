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
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { deleteAccount } from '@/lib/actions';
import { AlertDialogTrigger } from '@radix-ui/react-alert-dialog';
import { useState } from 'react';
import { LuAlertTriangle, LuBomb } from 'react-icons/lu';
import { toast } from 'sonner';
import ErrorDialog from '../ErrorDialog';

const DeleteAccountButton = () => {
  const [error, setError] = useState(false);
  const [isDeleting, setDeleting] = useState(false);

  const confirmDeleteAccount = async () => {
    try {
      setDeleting(true);

      await deleteAccount();
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
          <Button variant='destructive' disabled={isDeleting}>
            <LuAlertTriangle className='mr-2 h-4 w-4' />
            Delete Account
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              On confirmation, your plutarc account will be deleted and all
              associated data removed from the server, you will be automatically
              logged out.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <span className='text-red-600'>
            This action cannot be undone. This will permanently and irrevocably
            delete your plutarc account and remove all associated data from our
            servers.
          </span>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction asChild className='bg-red-800 hover:bg-red-600'>
              <Button onClick={confirmDeleteAccount} className='space-x-2'>
                <LuBomb size='16' />
                <span>DELETE ACCOUNT!</span>
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <ErrorDialog error={error} setError={setError} />
    </>
  );
};

export default DeleteAccountButton;
