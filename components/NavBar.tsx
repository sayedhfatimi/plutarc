import { auth } from '@/lib/auth';
import { gugiFont } from '@/lib/utils';
import Link from 'next/link';
import { LuLogIn } from 'react-icons/lu';
import ThemeToggle from './ThemeToggle';
import { Button } from './ui/button';

const NavBar = async () => {
  const session = await auth();

  return (
    <div className='flex w-screen flex-row items-center justify-between border-b bg-secondary/50 px-4 py-2 shadow-lg backdrop-blur-sm'>
      <div>
        <Link href='/' className={`${gugiFont.className} text-lg`}>
          plutarc
        </Link>
      </div>
      <div className='flex flex-row items-center justify-center space-x-4'>
        <ThemeToggle />
        {!session ? (
          <Button asChild>
            <Link href='/sign-in' className='space-x-2'>
              <LuLogIn className='size-4' />
              <span>Sign In</span>
            </Link>
          </Button>
        ) : (
          <>
            <Button asChild>
              <Link href='/terminal'>Terminal</Link>
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;
