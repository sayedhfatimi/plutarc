'use client';
import ThemeToggle from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { Box, Flex } from '@radix-ui/themes';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

const HomePage = () => {
  const { status } = useSession();

  return (
    <>
      <Box>
        HomePage
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
      </Box>
    </>
  );
};

export default HomePage;
