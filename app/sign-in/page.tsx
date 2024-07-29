import NavBar from '@/components/NavBar';
import PasskeyLogin from '@/components/PasskeyLogin';
import { Button } from '@/components/ui/button';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { auth, signIn } from '@/lib/auth';
import { ICON_SIZE_LARGE } from '@/lib/consts/UI';
import { redirect } from 'next/navigation';
import { LuHelpCircle, LuInfo, LuMail } from 'react-icons/lu';

const SignInPage = async () => {
  const session = await auth();

  if (session) redirect('/terminal');

  return (
    <div className='space-y-4'>
      <NavBar />
      <div className='relative m-auto flex min-h-96 w-[640px] flex-col items-center justify-center space-y-4 border bg-secondary/50 p-4 shadow-lg backdrop-blur-sm'>
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
        <div className='w-64'>
          <PasskeyLogin />
        </div>
        <div className='fixed top-0 right-4'>
          <HoverCard>
            <HoverCardTrigger>
              <LuHelpCircle
                size={ICON_SIZE_LARGE}
                className='text-muted-foreground'
              />
            </HoverCardTrigger>
            <HoverCardContent className='space-y-2 font-mono'>
              <header className='flex flex-row items-center justify-start space-x-2'>
                <LuInfo size={ICON_SIZE_LARGE} />
                <div className='flex flex-col'>
                  <h1 className='text-left text-2xl'>Info</h1>
                  <span className='text-muted-foreground text-xs'>
                    How to use Passkey login?
                  </span>
                </div>
              </header>
              <Separator />
              <p className='text-pretty text-justify text-xs'>
                To login with a Passkey alone follow these steps:
                <br />
                <br />
                <ol className='list-inside list-decimal'>
                  <li>Login via magic link.</li>
                  <li>Go to Profile Settings.</li>
                  <li>Click Register Passkey.</li>
                </ol>
                <br />
                All future logins can proceed with Passkey option alone.
              </p>
            </HoverCardContent>
          </HoverCard>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
