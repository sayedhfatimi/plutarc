'use client';
import { ICON_SIZE_MEDIUM } from '@/lib/consts/UI';
import { signIn } from 'next-auth/webauthn';
import { LuKeyRound } from 'react-icons/lu';
import { Button } from './ui/button';

const PasskeyRegister = () => {
  return (
    <Button
      className='w-full space-x-2'
      variant='link'
      size='sm'
      onClick={() => signIn('passkey', { action: 'register' })}
    >
      <LuKeyRound size={ICON_SIZE_MEDIUM} />
      <span>Register New Passkey</span>
    </Button>
  );
};

export default PasskeyRegister;
