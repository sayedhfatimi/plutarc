import { signOut } from '@/lib/auth';
import { LuLogOut } from 'react-icons/lu';
import { Button } from './ui/button';

const SignOutButton = () => {
  return (
    <form
      action={async () => {
        'use server';
        await signOut({ redirect: true, redirectTo: '/' });
      }}
    >
      <Button type='submit' className='space-x-2' variant='destructive'>
        <LuLogOut size='16' />
        <span>Sign Out</span>
      </Button>
    </form>
  );
};

export default SignOutButton;
