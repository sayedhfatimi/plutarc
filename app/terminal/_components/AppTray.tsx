import ContentWrapper from '@/components/ContentWrapper';
import ThemeToggle from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import {
  LuBookKey,
  LuLogOut,
  LuMenu,
  LuSettings2,
  LuUser,
  LuUser2,
} from 'react-icons/lu';
import DialogItem from './DialogItem';
import { auth } from '@/lib/auth';

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
              <DialogItem triggerIcon={<LuUser />} triggerTitle='Profile'>
                <DialogHeader>
                  <DialogTitle className='flex flex-row items-center space-x-2'>
                    <LuSettings2 className='size-6' />
                    <span>Profile Settings</span>
                  </DialogTitle>
                  <DialogDescription>
                    Edit Profile Settings Here
                  </DialogDescription>
                </DialogHeader>
                <ContentWrapper>
                  <div>Profile Settings goes here</div>
                </ContentWrapper>
              </DialogItem>

              <DialogItem triggerIcon={<LuBookKey />} triggerTitle='API Keys'>
                <DialogHeader>
                  <DialogTitle className='flex flex-row items-center space-x-2'>
                    <LuSettings2 className='size-6' />
                    <span>API Keys</span>
                  </DialogTitle>
                  <DialogDescription>
                    Manage your API Keys Here
                  </DialogDescription>
                </DialogHeader>
                <ContentWrapper>
                  <div>Manage API Keys here</div>
                </ContentWrapper>
              </DialogItem>

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
