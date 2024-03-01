import ThemeToggle from '@/components/ThemeToggle';
import { EvervaultCard, Icon } from '@/components/ui/evervault-card';
import { gugiFont } from '@/lib/utils';
import { Box, Flex, Text } from '@radix-ui/themes';
import { getProviders } from 'next-auth/react';
import Link from 'next/link';
import LoginProvidersButton from './_components/LoginProvidersButton';

const LoginPage = async () => {
  const providers = await getProviders();

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
          className='max-w-md items-start border bg-background p-8 shadow-lg'
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

            <h2 className='text-md my-8 font-light text-black dark:text-white'>
              More sign in options coming soon.
            </h2>

            {Object.values(providers!).map((provider) => (
              <div key={provider.id}>
                <LoginProvidersButton provider={provider} />
              </div>
            ))}
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default LoginPage;
