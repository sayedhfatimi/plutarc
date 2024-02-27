'use client';
import { Button } from '@/components/ui/button';
import { ClientSafeProvider, signIn } from 'next-auth/react';

const LoginProvidersButton = ({
  provider,
}: {
  provider: ClientSafeProvider;
}) => {
  return (
    <>
      <Button
        onClick={() => signIn(provider.id, { callbackUrl: '/auth/dashboard' })}
      >
        Sign in with {provider.name}
      </Button>
    </>
  );
};

export default LoginProvidersButton;
