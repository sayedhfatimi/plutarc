'use client';
import Spinner from '@/components/Spinner';
import { signOut } from 'next-auth/react';
import { useEffect } from 'react';

const SignOutPage = () => {
  useEffect(() => {
    signOut({
      redirect: true,
      callbackUrl: '/',
    });
  });

  return (
    <div className='h-screen place-content-center place-items-center text-center'>
      <Spinner />
    </div>
  );
};

export default SignOutPage;
