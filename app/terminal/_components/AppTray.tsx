import ThemeToggle from '@/components/ThemeToggle';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import ApiKeys from './_apikeys/ApiKeys';
import ApiKeysSelect from './_apikeys/ApiKeysSelect';
import Profile from './_profile/Profile';
import TerminalSettings from './_terminal/TerminalSettings';
import TickerList from './_terminal/TickerList';
import TickerStrip from './_terminal/TickerStrip';
import Wallet from './_terminal/Wallet';

const AppTray = async () => {
  const session = await auth();

  if (!session) redirect('/sign-in');

  return (
    <div className='fixed bottom-0 flex h-[48px] w-full flex-row items-center justify-between border-t bg-secondary/50 px-2 py-2 backdrop-blur-sm'>
      <div className='flex flex-row items-center'>
        <TickerList />
        <TickerStrip />
      </div>
      <div className='flex grow flex-row items-center justify-end space-x-2'>
        <ApiKeysSelect />
        <Wallet />
        <TerminalSettings />
        <ApiKeys />
        <Profile userSession={session} />
        <ThemeToggle />
      </div>
    </div>
  );
};

export default AppTray;
