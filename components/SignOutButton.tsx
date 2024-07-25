import { signOut } from '@/lib/auth';
import { ICON_SIZE_SMALL } from '@/lib/consts/UI';
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
        <LuLogOut size={ICON_SIZE_SMALL} />
        <span>Sign Out</span>
      </Button>
    </form>
  );
};

export default SignOutButton;
