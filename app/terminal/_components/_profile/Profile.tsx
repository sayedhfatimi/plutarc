'use client';
import ContentWrapper from '@/components/ContentWrapper';
import KBShortcutLabel from '@/components/KBShortcutLabel';
import PasskeyRegister from '@/components/PasskeyRegister';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import {
  ICON_SIZE_LARGE,
  ICON_SIZE_SMALL,
  KB_SHORTCUT_PROFILE_SETTINGS,
} from '@/lib/consts/UI';
import useKBShortcut from '@/lib/hooks/useKBShortcut';
import type { Session } from 'next-auth';
import Link from 'next/link';
import { LuLogOut, LuSettings2, LuSkull } from 'react-icons/lu';
import AppTrayAvatar from '../AppTrayAvatar';
import DeleteAccountButton from './DeleteAccountButton';
import ProfileImage from './ProfileImage';
import ResetPassphraseButton from './ResetPassphraseButton';

const Profile = ({ userSession }: { userSession: Session }) => {
  const { open, setOpen } = useKBShortcut(KB_SHORTCUT_PROFILE_SETTINGS);

  return (
    <Popover onOpenChange={setOpen} open={open} modal>
      <PopoverTrigger asChild>
        <Button variant='outline' className='space-x-2' size='sm'>
          <AppTrayAvatar />
          <KBShortcutLabel kbKey={KB_SHORTCUT_PROFILE_SETTINGS} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[900px] select-none space-y-2 text-pretty font-mono'>
        <div className='flex items-center justify-between'>
          <header className='flex flex-row items-center space-x-2'>
            <LuSettings2 size={ICON_SIZE_LARGE} />
            <div className='flex flex-col'>
              <h1 className='font-bold text-2xl'>Profile Settings</h1>
              <span className='text-muted-foreground text-xs'>
                Edit Profile Settings
              </span>
            </div>
          </header>
          <div className='flex flex-row items-center space-x-4'>
            <PasskeyRegister />
            <Button variant='outline' size='sm' asChild>
              <Link href='/sign-out' className='space-x-2'>
                <LuLogOut size={ICON_SIZE_SMALL} />
                <span>Sign Out</span>
              </Link>
            </Button>
          </div>
        </div>
        <Separator />
        <ContentWrapper className='space-y-4 p-4'>
          <section className='flex items-start justify-between'>
            <div className='flex flex-col space-y-1'>
              <div className='font-bold text-2xl'>
                Name: {userSession?.user.name || 'No Name'}
              </div>
              <div className='text-slate-600 text-sm'>
                email: {userSession?.user.email}
              </div>
            </div>
            <ProfileImage />
          </section>

          <section className='flex flex-col space-y-2'>
            <div className='flex flex-row items-center space-x-2 p-2 text-red-800'>
              <LuSkull size={ICON_SIZE_LARGE} />
              <span className='font-bold text-xl'>Destructive Actions</span>
            </div>
            <Separator />
            <div className='flex flex-row items-center justify-between space-x-8 p-2'>
              <div className='flex flex-col'>
                <h1 className='font-bold text-xl'>Reset Passphrase</h1>
                <span className='text-muted-foreground text-xs'>
                  In the instance that you may have forgotten your passphrase,
                  use this button.
                </span>
              </div>
              <ResetPassphraseButton />
            </div>
            <div className='flex flex-row items-center justify-between space-x-8 p-2'>
              <div className='flex flex-col'>
                <h1 className='font-bold text-xl'>Delete Account</h1>
                <span className='text-muted-foreground text-xs'>
                  This will delete your plutarc account and irrevocably remove
                  all associated data from our servers.
                </span>
              </div>
              <DeleteAccountButton />
            </div>
          </section>
        </ContentWrapper>
      </PopoverContent>
    </Popover>
  );
};

export default Profile;
