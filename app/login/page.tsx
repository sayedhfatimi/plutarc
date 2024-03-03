'use client';
import ThemeToggle from '@/components/ThemeToggle';
import { EvervaultCard, Icon } from '@/components/ui/evervault-card';
import { gugiFont } from '@/lib/utils';
import bg from '@/public/images/login-bg.png';
import { PublicProvider } from '@auth/core/types';
import { Box, Flex, Text } from '@radix-ui/themes';
import { getProviders } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import LoginProvidersButton from './_components/LoginProvidersButton';

const LoginPage = () => {
  const [providers, setProviders] = useState([] as PublicProvider[]);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      if (res === null) return;
      setProviders(res);
    })();
  }, []);

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
          <Text size='5' className={`${gugiFont.className} `}>
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

            <Flex
              direction='column'
              align='center'
              gap='4'
              width='100%'
              className='mt-8'
            >
              {Object.values(providers!).map((provider: PublicProvider) => (
                <div key={provider.id}>
                  <LoginProvidersButton provider={provider} />
                </div>
              ))}
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default LoginPage;
