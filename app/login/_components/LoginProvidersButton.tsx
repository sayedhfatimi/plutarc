'use client';
import { PublicProvider } from '@auth/core/types';
import { Box, Button as RadixButton } from '@radix-ui/themes';
import { signIn } from 'next-auth/react';
import { FaApple, FaGoogle, FaXTwitter } from 'react-icons/fa6';

const LoginProvidersButton = ({ provider }: { provider: PublicProvider }) => {
  const providerIconMap: { [key: string]: React.ReactNode } = {
    google: <FaGoogle />,
    twitter: <FaXTwitter />,
    apple: <FaApple />,
  };

  return (
    <>
      <RadixButton
        onClick={() => signIn(provider.id, { callbackUrl: '/auth/dashboard' })}
        size='2'
        variant='solid'
        color={
          provider.id === 'google'
            ? 'tomato'
            : provider.id === 'twitter'
              ? 'blue'
              : 'gold'
        }
      >
        <Box asChild className='h-6 w-6'>
          {providerIconMap[provider.id]}
        </Box>
        <Box>Sign in with {provider.name}</Box>
      </RadixButton>
    </>
  );
};

export default LoginProvidersButton;
