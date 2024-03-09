'use client';
import Spinner from '@/components/Spinner';
import { Grid } from '@radix-ui/themes';
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
    <>
      <Grid
        columns='1'
        className='h-screen place-content-center place-items-center'
      >
        <Spinner />
      </Grid>
    </>
  );
};

export default SignOutPage;
