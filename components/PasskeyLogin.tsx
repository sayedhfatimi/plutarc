'use client';
import { useSession } from 'next-auth/react';
import { signIn } from 'next-auth/webauthn';
import { Button } from './ui/button';

const PasskeyLogin = () => {
  const { status } = useSession();

  return (
    <>
      {status === 'authenticated' ? (
        <Button
          className='w-full'
          onClick={() => signIn('passkey', { action: 'register' })}
        >
          Register new Passkey
        </Button>
      ) : status === 'unauthenticated' ? (
        <Button className='w-full' onClick={() => signIn('passkey')}>
          Sign in with Passkey
        </Button>
      ) : null}
    </>
  );
};

export default PasskeyLogin;
