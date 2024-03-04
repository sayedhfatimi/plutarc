'use client';
import ThemeToggle from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { gugiFont } from '@/lib/utils';
import { Box, Flex, Heading, Text } from '@radix-ui/themes';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

const HomePage = () => {
  const { status } = useSession();

  return (
    <>
      <Flex justify='between' className='px-4 py-2'>
        <Flex>
          <Link href='/'>
            <Text size='5' className={`${gugiFont.className} `}>
              plutarc
            </Text>
          </Link>
        </Flex>
        <Flex gap='4'>
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
      </Flex>
      <Flex direction='column'>
        <Box>
          <Box className='px-8 py-4'>
            <Heading size='9'>
              Consistent. Fast. Ready. <br /> Never miss another trade.
            </Heading>
          </Box>
          <Box className='px-8 py-4'>
            <Heading size='3' color='gray'>
              plutarc trading terminal helps remove the variability, providing a
              fast and familiar trading experience, regardless of your platform.
              Always ready for any market move, whenever you are.
            </Heading>
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export default HomePage;
