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
import { auth } from '@/lib/auth';
import Link from 'next/link';
import {
  LuBookKey,
  LuKeyRound,
  LuLogOut,
  LuSettings2,
  LuUser,
  LuUser2,
} from 'react-icons/lu';
import DropdownDialogItem from './DropdownDialogItem';
import SettingsDrawer from './SettingsDrawer';

const AppTray = async () => {
  const session = await auth();

  return (
    <>
      <div className='fixed bottom-0 flex h-[48px] w-full flex-row items-center justify-between border-t bg-secondary/50 px-2 py-2 backdrop-blur-sm'>
        <SettingsDrawer />
        <div className='flex flex-row items-center space-x-2'>
          <ThemeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size='icon' variant='outline'>
                <LuUser2 size='16' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel className='text-muted-foreground'>
                {session?.user?.email}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownDialogItem
                triggerIcon={<LuUser size='16' />}
                triggerTitle='Profile'
              >
                <DialogHeader>
                  <DialogTitle className='flex flex-row items-center space-x-2'>
                    <LuSettings2 size='24' />
                    <span>Profile Settings</span>
                  </DialogTitle>
                  <DialogDescription>
                    Edit Profile Settings Here
                  </DialogDescription>
                </DialogHeader>
                <ContentWrapper>Profile Settings goes here</ContentWrapper>
              </DropdownDialogItem>

              <DropdownDialogItem
                triggerIcon={<LuBookKey size='16' />}
                triggerTitle='API Keys'
              >
                <DialogHeader>
                  <DialogTitle className='flex flex-row items-center space-x-2'>
                    <LuKeyRound size='24' />
                    <span>API Keys</span>
                  </DialogTitle>
                  <DialogDescription>
                    Manage your API Keys Here
                  </DialogDescription>
                </DialogHeader>
                <ContentWrapper>Manage API Keys here</ContentWrapper>
              </DropdownDialogItem>

              <DropdownMenuSeparator />
              <DropdownMenuItem className='space-x-2' asChild>
                <Link href='/sign-out'>
                  <LuLogOut size='16' />
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
