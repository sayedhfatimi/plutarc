'use client';
import { signIn } from 'next-auth/webauthn';
import { LuKeyRound } from 'react-icons/lu';
import { Button } from './ui/button';

const PasskeyLogin = () => {
  return (
    <>
      <Button
        className='w-full space-x-2'
        variant='link'
        size='sm'
        onClick={() =>
          signIn('passkey', { redirect: true, redirectTo: '/terminal' })
        }
      >
        <LuKeyRound size='24' />
        <span>Sign in with Passkey</span>
      </Button>
    </>
  );
};

export default PasskeyLogin;
