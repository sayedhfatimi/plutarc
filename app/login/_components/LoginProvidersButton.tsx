'use client';
import { Button } from '@/components/ui/button';
import { Box } from '@radix-ui/themes';
import { ClientSafeProvider, signIn } from 'next-auth/react';
import { FaGoogle } from 'react-icons/fa';

const LoginProvidersButton = ({
  provider,
}: {
  provider: ClientSafeProvider;
}) => {
  const providerIconMap: { [key: string]: React.ReactNode } = {
    google: <FaGoogle />,
  };

  return (
    <>
      <Button
        onClick={() => signIn(provider.id, { callbackUrl: '/auth/dashboard' })}
        className='space-x-6 p-4'
        size='lg'
      >
        <Box asChild className='h-8 w-8'>
          {providerIconMap[provider.id]}
        </Box>
        <Box>Sign in with {provider.name}</Box>
      </Button>
    </>
  );
};

export default LoginProvidersButton;
