import ThemeToggle from '@/components/ThemeToggle';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import ApiKeysDialog from './_apikeys/ApiKeysDialog';
import ApiKeysSelect from './_apikeys/ApiKeysSelect';
import ProfileSettingsDialog from './_profile/ProfileSettingsDialog';
import TerminalSettings from './_terminal/TerminalSettings';
import TickerList from './_terminal/TickerList';
import TickerStrip from './_terminal/TickerStrip';

const AppTray = async () => {
  const session = await auth();

  if (!session) redirect('/sign-in');

  return (
    <div className='fixed bottom-0 flex h-[48px] w-full flex-row items-center justify-between border-t bg-secondary/50 px-2 py-2 backdrop-blur-sm'>
      <div className='flex flex-row items-center space-x-2'>
        <TickerList />
        <TickerStrip />
      </div>
      <div className='flex grow flex-row items-center justify-end space-x-2'>
        <ApiKeysSelect />
        <TerminalSettings />
        <ApiKeysDialog />
        <ProfileSettingsDialog userSession={session} />
        <ThemeToggle />
      </div>
    </div>
  );
};

export default AppTray;
