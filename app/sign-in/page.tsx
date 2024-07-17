import PasskeyLogin from '@/components/PasskeyLogin';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { signIn } from '@/lib/auth';

const SignInPage = () => {
  return (
    <div className='flex h-screen items-center justify-center'>
      <div className='flex w-[640px] flex-col items-center justify-center space-y-4 border bg-primary-foreground p-4'>
        <form
          action={async (formData) => {
            'use server';
            await signIn('resend', formData);
          }}
          className='flex w-48 flex-col space-y-2'
        >
          <Input type='text' name='email' placeholder='Email' />
          <Button type='submit'>Signin with Email</Button>
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
