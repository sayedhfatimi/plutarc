import ThemeToggle from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { auth } from '@/lib/auth';
import Link from 'next/link';
import { LuBookKey, LuLogOut, LuMenu, LuUser, LuUser2 } from 'react-icons/lu';

const AppTray = async () => {
  const session = await auth();

  return (
    <>
      <div className='absolute bottom-0 flex h-[48px] w-screen flex-row items-center justify-between border-t bg-secondary/50 px-2 py-2 backdrop-blur-sm'>
        <Button className='space-x-2' size='sm'>
          <LuMenu className='size-4' />
          <span>edit terminal</span>
        </Button>
        <div className='flex flex-row items-center space-x-2'>
          <ThemeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size='icon' variant='outline'>
                <LuUser2 className='size-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel className='text-muted-foreground'>
                {session?.user?.email}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className='space-x-2'>
                <LuUser />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className='space-x-2'>
                <LuBookKey />
                <span>API Keys</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className='space-x-2' asChild>
                <Link href='/sign-out'>
                  <LuLogOut />
                  <span>Sign Out</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </>
  );
};

export default AppTray;
