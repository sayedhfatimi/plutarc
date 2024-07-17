import NavBar from '@/components/NavBar';
import SignOutButton from '@/components/SignOutButton';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

const SignOutPage = async () => {
  const session = await auth();

  if (!session) redirect('/sign-in');

  return (
    <div className='space-y-4'>
      <NavBar />
      <div className='m-auto flex min-h-96 w-[640px] flex-col items-center justify-center space-y-4 border bg-secondary/50 p-4 shadow-lg backdrop-blur-sm'>
        <h1 className='text-lg font-bold text-muted-foreground'>
          Are you sure you want to sign out?
        </h1>
        <SignOutButton />
      </div>
    </div>
  );
};

export default SignOutPage;
