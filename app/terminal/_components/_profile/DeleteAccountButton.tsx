'use client';
import { deleteAccount } from '@/lib/actions';
import { useState } from 'react';
import { LuAlertTriangle } from 'react-icons/lu';
import { toast } from 'sonner';
import DestructiveActionAlert from '../DestructiveActionAlert';

const DeleteAccountButton = () => {
  const [isDeleting, setDeleting] = useState(false);

  const confirmDeleteAccount = async () => {
    try {
      setDeleting(true);

      await deleteAccount();
    } catch (error) {
      setDeleting(false);
      toast.error('An unknown error has occurred.', {
        icon: <LuAlertTriangle />,
        closeButton: true,
      });
    }
  };

  return (
    <DestructiveActionAlert
      triggerDisabled={isDeleting}
      triggerTitle='Delete Account'
      triggerIcon={LuAlertTriangle}
      alertDescription='On confirmation, your plutarc account will be deleted and all associated data removed from the server, you will be automatically logged out.'
      confirmTitle='DELETE ACCOUNT!'
      confirmFn={confirmDeleteAccount}
      alertContent='This action cannot be undone. This will permanently and irrevocably delete your plutarc account and remove all associated data from our servers.'
    />
  );
};

export default DeleteAccountButton;
