import NavBar from '@/components/NavBar';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

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
    </div>
  );
};

export default HomePage;
