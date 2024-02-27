'use client';
import { Button } from '@/components/ui/button';
import { EvervaultCard, Icon } from '@/components/ui/evervault-card';
import { gugiFont } from '@/lib/utils';
import { Box, Flex } from '@radix-ui/themes';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

const HomePage = () => {
  const { status } = useSession();
  return (
    <>
      <Box className='m-auto w-screen p-8'>
        <Flex
          position='relative'
          m='auto'
          className='max-w-md items-start border p-8'
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
              Coming Soon.
            </h2>

            {status === 'authenticated' ? (
              <Button asChild>
                <Link href='/auth/dashboard'>Dashboard</Link>
              </Button>
            ) : (
              <Button asChild>
                <Link href='/api/auth/signin'>Login</Link>
              </Button>
            )}
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default HomePage;
