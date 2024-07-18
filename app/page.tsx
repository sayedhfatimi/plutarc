import NavBar from '@/components/NavBar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { LuCode2, LuFastForward, LuLock } from 'react-icons/lu';

const HomePage = async () => {
  const session = await auth();

  if (session) redirect('/terminal');

  return (
    <div className='space-y-4'>
      <NavBar />
      <div className='flex flex-col bg-slate-500/50 backdrop-blur-sm'>
        <div className='px-8 py-4'>
          <h1 className='text-pretty text-6xl font-bold text-secondary-foreground'>
            Consistent. Fast. Ready. <br /> Never miss another trade.
          </h1>
        </div>
        <div className='px-8 py-4'>
          <h1 className='text-pretty text-right text-2xl font-bold text-muted-foreground'>
            <p>
              plutarc trading terminal helps remove the variability, providing a
              fast and familiar trading experience, regardless of your platform.
            </p>
            <p>Always ready for any market move, whenever you are.</p>
          </h1>
        </div>
      </div>
      <div className='flex flex-row items-center justify-center space-x-4 bg-slate-700/50 py-4 backdrop-blur-sm'>
        <Card className='h-[300px] w-[300px] shadow-sm'>
          <CardHeader>
            <CardTitle className='flex flex-row items-center space-x-2'>
              <LuLock size='24' /> <span>Secure</span>
            </CardTitle>
            <CardDescription>All data is encrypted.</CardDescription>
            <CardContent>
              No data leaves or returns to the browser unencrypted.
            </CardContent>
          </CardHeader>
        </Card>

        <Card className='h-[300px] w-[300px] shadow-sm'>
          <CardHeader>
            <CardTitle className='flex flex-row items-center space-x-2'>
              <LuFastForward size='24' />
              <span>Fast</span>
            </CardTitle>
            <CardDescription>
              Direct connectivity to the exchange.
            </CardDescription>
            <CardContent>
              Your data, orders, position information does not proxy through our
              servers. <br />
              Secure WebSocket connection instantiated on launch.
            </CardContent>
          </CardHeader>
        </Card>

        <Card className='h-[300px] w-[300px] shadow-sm'>
          <CardHeader>
            <CardTitle className='flex flex-row items-center space-x-2'>
              <LuCode2 size='24' /> <span>Open Source</span>
            </CardTitle>
            <CardDescription>Check the Github</CardDescription>
            <CardContent></CardContent>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};

export default HomePage;
