import ThemeToggle from '@/components/ThemeToggle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { auth } from '@/lib/auth';
import { ICON_SIZE_SMALL } from '@/lib/consts/UI';
import Link from 'next/link';
import { LuLogOut } from 'react-icons/lu';
import AppTrayAvatar from './AppTrayAvatar';
import ApiKeysDialog from './_apikeys/ApiKeysDialog';
import ApiKeysSelect from './_apikeys/ApiKeysSelect';
import ProfileSettingsDialog from './_profile/ProfileSettingsDialog';
import TerminalSettings from './_terminal/TerminalSettings';
import TickerList from './_terminal/TickerList';
import TickerStrip from './_terminal/TickerStrip';

const AppTray = async () => {
  const session = await auth();

  return (
    <>
      <div className='fixed bottom-0 flex h-[48px] w-full flex-row items-center justify-between border-t bg-secondary/50 px-2 py-2 backdrop-blur-sm'>
        <div className='flex flex-row items-center'>
          <TickerList />
          <TickerStrip />
        </div>
        <div className='flex grow flex-row items-center justify-end space-x-2'>
          <ApiKeysSelect />
          <ThemeToggle />
          <TerminalSettings />
          <DropdownMenu>
            <DropdownMenuTrigger>
              <AppTrayAvatar />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel className='text-muted-foreground'>
                {session?.user?.email}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />

              <ProfileSettingsDialog />

              <ApiKeysDialog />

              <DropdownMenuSeparator />
              <DropdownMenuItem className='space-x-2' asChild>
                <Link href='/sign-out'>
                  <LuLogOut size={ICON_SIZE_SMALL} />
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
