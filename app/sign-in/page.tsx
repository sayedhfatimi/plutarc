import NavBar from '@/components/NavBar';
import PasskeyLogin from '@/components/PasskeyLogin';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { auth, signIn } from '@/lib/auth';
import { ICON_SIZE_LARGE } from '@/lib/consts/UI';
import { redirect } from 'next/navigation';
import { LuHelpCircle, LuMail } from 'react-icons/lu';

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
          <TooltipProvider delayDuration={400}>
            <Tooltip>
              <TooltipTrigger asChild>
                <LuHelpCircle
                  size={ICON_SIZE_LARGE}
                  className='text-muted-foreground'
                />
              </TooltipTrigger>
              <TooltipContent className='w-64 text-pretty text-center'>
                You must login at least once using the email magic link and
                register a Passkey before being able to login with a Passkey.
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
