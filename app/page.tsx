'use client';
import ThemeToggle from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { gugiFont } from '@/lib/utils';
import binanceLogo from '@/public/images/logos/binance.svg';
import bitmexLogo from '@/public/images/logos/bitmex.svg';
import bybitLogo from '@/public/images/logos/bybit.svg';
import phemexLogo from '@/public/images/logos/phemex.png';
import screenshot1 from '@/public/images/screenshots/1.jpg';
import screenshot2 from '@/public/images/screenshots/2.jpg';
import screenshot3 from '@/public/images/screenshots/3.jpg';
import screenshot4 from '@/public/images/screenshots/4.png';
import screenshot5 from '@/public/images/screenshots/5.jpg';
import { Box, Flex, Heading, Text } from '@radix-ui/themes';
import Autoplay from 'embla-carousel-autoplay';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

const HomePage = () => {
  const { status } = useSession();

  return (
    <>
      <Flex
        direction='row'
        justify='between'
        align='center'
        className='px-4 py-2'
      >
        <Flex>
          <Text size='5' className={`${gugiFont.className} `}>
            plutarc
          </Text>
        </Flex>
        <Flex gap='4'>
          <ThemeToggle />
          {status === 'authenticated' ? (
            <Button asChild>
              <Link href='/auth/dashboard'>Dashboard</Link>
            </Button>
          ) : (
            <Button asChild>
              <Link href='/sign-in'>Sign In</Link>
            </Button>
          )}
        </Flex>
      </Flex>
      <Flex direction='column' className='bg-slate-500/50'>
        <Box>
          <Box className='px-8 py-4'>
            <Heading size='9'>
              Consistent. Fast. Ready. <br /> Never miss another trade.
            </Heading>
          </Box>
          <Box className='px-8 py-4'>
            <Heading size='3' color='gray'>
              <p>
                plutarc trading terminal helps remove the variability, providing
                a fast and familiar trading experience, regardless of your
                platform.
              </p>
              <p>Always ready for any market move, whenever you are.</p>
            </Heading>
          </Box>
        </Box>
      </Flex>
      <Flex
        direction='column'
        align='center'
        justify='center'
        className='my-4 bg-slate-600/50 py-4'
        gap='2'
      >
        <Heading>Supported Exchanges</Heading>
        <hr />
        <Flex
          className=' bg-slate-800/75 px-8 py-4 shadow-sm'
          align='center'
          gap='9'
        >
          <Image src={bitmexLogo} alt='Bitmex Logo' width='160' />
          <Image src={binanceLogo} alt='Binance Logo' width='160' />
          <Image src={bybitLogo} alt='Bybit Logo' width='100' />
          <Image src={phemexLogo} alt='Phemex Logo' width='100' />
        </Flex>
      </Flex>
      <Flex className='px-20 py-4'>
        <Carousel
          opts={{ dragFree: true, loop: true }}
          plugins={[
            Autoplay({
              delay: 3000,
            }),
          ]}
        >
          <CarouselContent>
            {CarouselItems.map((item, index) => (
              <CarouselItem className='basis-1/3' key={index}>
                {item.image}
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </Flex>
    </>
  );
};

const CarouselItems = [
  { image: <Image src={screenshot1} alt='Screenshot 1' /> },
  { image: <Image src={screenshot2} alt='Screenshot 2' /> },
  { image: <Image src={screenshot3} alt='Screenshot 3' /> },
  { image: <Image src={screenshot4} alt='Screenshot 4' /> },
  { image: <Image src={screenshot5} alt='Screenshot 5' /> },
];

export default HomePage;
