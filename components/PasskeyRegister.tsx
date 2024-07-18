'use client';
import { signIn } from 'next-auth/webauthn';
import { Button } from './ui/button';
import { LuKeyRound } from 'react-icons/lu';

const PasskeyRegister = () => {
  return (
    <Button
      className='w-full space-x-2'
      variant='link'
      size='sm'
      onClick={() => signIn('passkey', { action: 'register' })}
    >
      <LuKeyRound size='32' />
      <span>Register New Passkey</span>
    </Button>
  );
};

export default PasskeyRegister;
