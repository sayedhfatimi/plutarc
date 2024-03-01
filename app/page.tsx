'use client';
import ThemeToggle from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { HeroParallax } from '@/components/ui/hero-parallax';
import { gugiFont } from '@/lib/utils';
import { Box, Flex, Text } from '@radix-ui/themes';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

const HomePage = () => {
  const { status } = useSession();

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
      <Box className='mt-[52px]'>
        <HeroParallax products={products} />
      </Box>
    </>
  );
};

export const products: { title: string; link: string; thumbnail: string }[] = [
  {
    title: 'ByBit',
    link: 'https://www.bybit.com/en/',
    thumbnail: '/images/bybit.png',
  },
  {
    title: 'Binance',
    link: 'https://www.binance.com/en-GB',
    thumbnail: '/images/binance.png',
  },
  {
    title: 'BitMex',
    link: 'https://www.bitmex.com/',
    thumbnail: '/images/bitmex.png',
  },
  {
    title: 'TradingView',
    link: 'https://www.tradingview.com/',
    thumbnail: '/images/GDgPX41XAAAQaMY.jpg',
  },
];

export default HomePage;
