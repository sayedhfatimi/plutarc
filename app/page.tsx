import ThemeToggle from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { gugiFont } from '@/lib/utils';
import Link from 'next/link';
import { LuLogIn } from 'react-icons/lu';

const HomePage = () => {
  return (
    <>
      <div className='space-y-4'>
        <div className='flex w-screen flex-row items-center justify-between border-b bg-secondary/50 px-4 py-2 shadow-lg backdrop-blur-sm'>
          <div>
            <Link href='/' className={`${gugiFont.className} text-lg`}>
              plutarc
            </Link>
          </div>
          <div className='flex flex-row items-center justify-center space-x-4'>
            <ThemeToggle />
            <Button asChild>
              <Link href='/sign-in' className='space-x-2'>
                <LuLogIn className='size-4' />
                <span>Sign In</span>
              </Link>
            </Button>
          </div>
        </div>

        <div className='flex flex-col bg-slate-500/50 backdrop-blur-sm'>
          <div className='px-8 py-4'>
            <h1 className='text-pretty text-6xl font-bold text-secondary-foreground'>
              Consistent. Fast. Ready. <br /> Never miss another trade.
            </h1>
          </div>
          <div className='px-8 py-4'>
            <h1 className='text-pretty text-right text-2xl font-bold text-muted-foreground'>
              <p>
                plutarc trading terminal helps remove the variability, providing
                a fast and familiar trading experience, regardless of your
                platform.
              </p>
              <p>Always ready for any market move, whenever you are.</p>
            </h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
