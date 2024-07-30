import NavBar from '@/components/NavBar';
import ScreenshotCarousel from '@/components/ScreenshotCarousel';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { auth } from '@/lib/auth';
import { ICON_SIZE_MEDIUM } from '@/lib/consts/UI';
import { gugiFont } from '@/lib/utils';
import { redirect } from 'next/navigation';
import React from 'react';
import { LuCode2, LuFastForward, LuLock } from 'react-icons/lu';

const HomePage = async () => {
  const session = await auth();

  if (session) redirect('/terminal');

  return (
    <main className='space-y-8'>
      <NavBar />

      <section className='flex flex-col border-t border-b bg-secondary/50 shadow-md backdrop-blur-sm'>
        <div className='px-8 py-4'>
          <h1 className='text-pretty font-bold text-6xl text-secondary-foreground'>
            Consistent. Fast. Ready. <br /> Never miss another trade.
          </h1>
        </div>
        <div className='px-8 py-4'>
          <h1 className='text-pretty text-right font-semibold text-2xl text-muted-foreground'>
            <p>
              plutarc trading terminal helps remove the variability, providing a
              fast and familiar trading experience, regardless of your platform.
            </p>
            <p>Always ready for any market move, whenever you are.</p>
          </h1>
        </div>
      </section>

      <section className='py-4 md:px-20'>
        <ScreenshotCarousel />
      </section>

      <section className='flex flex-col space-y-8 border-t border-b bg-secondary/50 py-4 shadow-md backdrop-blur-sm'>
        <div className='text-center font-bold text-4xl'>
          Why <span className={gugiFont.className}>plutarc</span>?
        </div>
        <div className='flex flex-col items-center justify-center space-y-4 md:flex-row md:space-x-4 md:space-y-0'>
          {CardData.map((card) => (
            <Card className='h-[300px] w-[300px] shadow-sm' key={card.title}>
              <CardHeader>
                <CardTitle className='flex flex-row items-center space-x-2'>
                  {React.createElement(card.titleIcon, {
                    size: ICON_SIZE_MEDIUM,
                  })}
                  <span>{card.title}</span>
                </CardTitle>
                <CardDescription>{card.description}</CardDescription>
                <CardContent>{card.content}</CardContent>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section className='flex flex-col space-y-8 border-t border-b bg-secondary/50 py-4 shadow-md backdrop-blur-sm'>
        <div className='text-center font-bold text-4xl'>
          Supported Exchanges
        </div>
      </section>
    </main>
  );
};

const CardData = [
  {
    title: 'Secure',
    titleIcon: LuLock,
    description: 'All data is encrypted',
    content: 'No data leaves or returns to the browser unencrypted.',
  },
  {
    title: 'Fast',
    titleIcon: LuFastForward,
    description: 'Direct connectivity to the exchange',
    content:
      'Your data, orders, position information does not proxy through our servers. Secure WebSocket connection instantiated to the exchange on launch.',
  },
  {
    title: 'Tech Stack',
    titleIcon: LuCode2,
    description: 'Next.js & React',
    content: 'Written in Next.js and React.',
  },
];

export default HomePage;
