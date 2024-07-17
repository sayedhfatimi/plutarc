'use client';
import { useSession } from 'next-auth/react';
import { signIn } from 'next-auth/webauthn';
import { LuKeyRound, LuKeySquare } from 'react-icons/lu';
import { Button } from './ui/button';

const PasskeyLogin = () => {
  const { status } = useSession();

  return (
    <>
      {status === 'authenticated' ? (
        <Button
          className='w-full space-x-2'
          onClick={() => signIn('passkey', { action: 'register' })}
        >
          <LuKeySquare className='size-4' />
          <span>Register new Passkey</span>
        </Button>
      ) : status === 'unauthenticated' ? (
        <Button
          className='w-full space-x-2'
          onClick={() =>
            signIn('passkey', { redirect: true, redirectTo: '/terminal' })
          }
        >
          <LuKeyRound className='size-4' />
          <span>Sign in with Passkey</span>
        </Button>
      ) : null}
    </>
  );
};

export default PasskeyLogin;
