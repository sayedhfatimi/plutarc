'use client';
import { useVault } from '@/Providers/VaultProvider';
import { useState } from 'react';
import { LuAlertTriangle } from 'react-icons/lu';
import DestructiveActionAlert from '../DestructiveActionAlert';

const ResetPassphraseButton = () => {
  const [isDeleting, setDeleting] = useState(false);
  const passphraseHash = useVault((state) => state.user.passphraseHash);
  const setPassphraseHash = useVault((state) => state.setPassphraseHash);

  const confirmResetPassphrase = () => {
    setDeleting(true);
    setPassphraseHash(undefined);
  };

  return (
    <DestructiveActionAlert
      triggerDisabled={isDeleting || passphraseHash === undefined}
      triggerTitle='Reset Passphrase'
      triggerIcon={LuAlertTriangle}
      alertDescription='On confirmation, your passphrase will be reset and all associated API keys deleted from the server, you will be automatically logged out and will need to log back in again.'
      confirmTitle='RESET PASSPHRASE!'
      confirmFn={confirmResetPassphrase}
      alertContent='This action cannot be undone. This will reset your passphrase and delete all API keys associated with this account.'
    />
  );
};

export default ResetPassphraseButton;
