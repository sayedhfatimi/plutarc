'use client';
import { resetPassphrase } from '@/lib/actions';
import { useAppSelector } from '@/lib/redux/hooks';
import { useState } from 'react';
import { LuAlertTriangle } from 'react-icons/lu';
import { toast } from 'sonner';
import DestructiveActionAlert from '../DestructiveActionAlert';
import ErrorDialog from '../ErrorDialog';

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
      <DestructiveActionAlert
        triggerDisabled={isDeleting || passphraseHash === undefined}
        triggerTitle='Reset Passphrase'
        triggerIcon={LuAlertTriangle}
        alertDescription='On confirmation, your passphrase will be reset and all associated API keys deleted from the server, you will be automatically logged out and will need to log back in again.'
        confirmTitle='RESET PASSPHRASE!'
        confirmFn={confirmResetPassphrase}
        alertContent='This action cannot be undone. This will reset your passphrase and delete all API keys associated with this account.'
      />
      <ErrorDialog error={error} setError={setError} />
    </>
  );
};

export default ResetPassphraseButton;
