'use client';
import { ICON_SIZE_MEDIUM } from '@/lib/consts/UI';
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
        <LuKeyRound size={ICON_SIZE_MEDIUM} />
        <span>Sign in with Passkey</span>
      </Button>
    </>
  );
};

export default PasskeyLogin;
