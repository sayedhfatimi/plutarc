import PasskeyLogin from '@/components/PasskeyLogin';
import ThemeToggle from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { signIn } from '@/lib/auth';
import { gugiFont } from '@/lib/utils';
import Link from 'next/link';
import { LuMail } from 'react-icons/lu';

const SignInPage = () => {
  return (
    <>
      <div className='flex w-screen flex-row items-center justify-between border-b bg-secondary/50 px-4 py-2 shadow-lg backdrop-blur-sm'>
        <div>
          <Link href='/' className={`${gugiFont.className} text-lg`}>
            plutarc
          </Link>
        </div>
        <div className='flex flex-row items-center justify-center space-x-4'>
          <ThemeToggle />
        </div>
      </div>
      <div className='flex h-screen items-center justify-center'>
        <div className='flex min-h-96 w-[640px] flex-col items-center justify-center space-y-4 border bg-secondary/50 p-4 shadow-lg backdrop-blur-sm'>
          <form
            action={async (formData) => {
              'use server';
              await signIn('resend', formData);
            }}
            className='flex w-48 flex-col space-y-2'
          >
            <Input type='text' name='email' placeholder='Email' />
            <Button className='space-x-2' type='submit'>
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
    </>
  );
};

export default SignInPage;
