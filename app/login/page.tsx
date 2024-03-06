'use client';
import ThemeToggle from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { EvervaultCard, Icon } from '@/components/ui/evervault-card';
import signInWithEthereum from '@/lib/auth/signInWithCrypto';
import { gugiFont } from '@/lib/utils';
import bg from '@/public/images/login-bg.png';
import { Box, Flex, Text } from '@radix-ui/themes';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { FaEthereum, FaGoogle } from 'react-icons/fa6';

const LoginPage = () => {
  return (
    <>
      <FloatElements />
      <Box className='m-auto w-screen p-8'>
        <Flex
          position='relative'
          m='auto'
          className='max-w-md items-start bg-background p-8 shadow-lg'
          style={{
            backgroundImage: `url(${bg.src})`,
            backgroundPosition: 'bottom',
            backgroundSize: 'cover',
          }}
        >
          <Flex
            m='auto'
            p='4'
            direction='column'
            justify='center'
            align='center'
            className='border'
            width='100%'
          >
            <Icon className='absolute -left-3 -top-3 h-6 w-6 text-black dark:text-white' />
            <Icon className='absolute -bottom-3 -left-3 h-6 w-6 text-black dark:text-white' />
            <Icon className='absolute -right-3 -top-3 h-6 w-6 text-black dark:text-white' />
            <Icon className='absolute -bottom-3 -right-3 h-6 w-6 text-black dark:text-white' />

            <EvervaultCard text='plutarc' className={gugiFont.className} />

            <Flex direction='column' gap='4' className='mt-8'>
              <LoginButtons />
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

const LoginButtons = () => {
  // array of providers
  const LoginProviders: {
    label: string;
    onClick: () => Promise<any>;
    icon: React.ReactNode;
    hoverColor?: string;
  }[] = [
    {
      label: 'Google',
      onClick: () => signIn('google', { callbackUrl: '/auth/dashboard' }),
      icon: <FaGoogle />,
      hoverColor: 'hover:bg-red-600',
    },
    {
      label: 'Ethereum',
      onClick: () => signInWithEthereum(),
      icon: <FaEthereum />,
      hoverColor: 'hover:bg-slate-600',
    },
  ];

  return (
    <>
      {LoginProviders.map((item) => (
        <Button
          key={item.label}
          onClick={item.onClick}
          className={`w-full bg-secondary text-black hover:text-white dark:text-white ${item.hoverColor}`}
          asChild
        >
          <Flex
            align='center'
            gap='4'
            justify='between'
            className='cursor-default'
          >
            <Box>Sign in with {item.label}</Box>
            <Box asChild className='h-6 w-6'>
              {item.icon}
            </Box>
          </Flex>
        </Button>
      ))}
    </>
  );
};

const FloatElements = () => {
  return (
    <>
      <Flex
        justify='center'
        align='start'
        gap='4'
        position='fixed'
        top='0'
        left='0'
        className='px-4 py-2'
      >
        <Link href='/'>
          <Text size='5' className={gugiFont.className}>
            plutarc
          </Text>
        </Link>
      </Flex>
      <Flex
        justify='center'
        align='end'
        gap='4'
        position='fixed'
        top='0'
        right='0'
        className='px-4 py-2'
      >
        <ThemeToggle />
      </Flex>
    </>
  );
};

export default LoginPage;
