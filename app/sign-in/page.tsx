import NavBar from '@/components/NavBar';
import PasskeyLogin from '@/components/PasskeyLogin';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { auth, signIn } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { LuMail } from 'react-icons/lu';

const SignInPage = async () => {
  const session = await auth();

  if (session) redirect('/terminal');

  return (
    <div className='space-y-4'>
      <NavBar />
      <div className='m-auto flex min-h-96 w-[640px] flex-col items-center justify-center space-y-4 border bg-secondary/50 p-4 shadow-lg backdrop-blur-sm'>
        <form
          action={async (formData) => {
            'use server';
            await signIn('resend', formData);
          }}
          className='flex w-48 flex-col space-y-2'
        >
          <Input type='text' name='email' placeholder='Email' />
          <Button className='space-x-2' type='submit' size='sm'>
            <LuMail className='size-4' />
            <span>Signin with Email</span>
          </Button>
        </form>
        <Separator decorative />
        <div className='w-48'>
          <PasskeyLogin />
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
