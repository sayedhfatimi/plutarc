'use client';
import ContentWrapper from '@/components/ContentWrapper';
import KBShortcutLabel from '@/components/KBShortcutLabel';
import PasskeyRegister from '@/components/PasskeyRegister';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  ICON_SIZE_LARGE,
  ICON_SIZE_MEDIUM,
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

const ProfileSettingsDialog = ({ userSession }: { userSession: Session }) => {
  const { open, setOpen } = useKBShortcut(KB_SHORTCUT_PROFILE_SETTINGS);

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button variant='outline' className='space-x-2' size='sm'>
          <AppTrayAvatar />
          <KBShortcutLabel kbKey={KB_SHORTCUT_PROFILE_SETTINGS} />
        </Button>
      </DialogTrigger>
      <DialogPortal>
        <DialogContent className='max-w-screen-lg space-y-2'>
          <div className='flex items-center justify-between pr-6'>
            <DialogHeader>
              <DialogTitle className='flex flex-row items-center space-x-2'>
                <LuSettings2 size={ICON_SIZE_MEDIUM} />
                <span>Profile Settings</span>
              </DialogTitle>
              <DialogDescription>Edit Profile Settings Here</DialogDescription>
            </DialogHeader>
            <Button variant='outline' size='sm' asChild>
              <Link href='/sign-out' className='space-x-2'>
                <LuLogOut size={ICON_SIZE_SMALL} />
                <span>Sign Out</span>
              </Link>
            </Button>
          </div>
          <ContentWrapper className='space-y-4 p-4'>
            <section className='flex items-start justify-between'>
              <div className='flex flex-col space-y-2'>
                <div className='font-bold text-2xl'>
                  Name: {userSession?.user.name || 'No Name'}
                </div>
                <div className='text-slate-600 text-sm'>
                  email: {userSession?.user.email}
                </div>
                <div>
                  <PasskeyRegister />
                </div>
              </div>
              <ProfileImage />
            </section>

            <section className='flex flex-col space-y-2'>
              <div className='flex flex-row items-center space-x-2 border-b p-2 text-red-800'>
                <LuSkull size={ICON_SIZE_LARGE} />
                <span className='font-bold text-xl'>Destructive Actions</span>
              </div>
              <div className='flex flex-row items-center justify-between p-2'>
                <div>
                  <div className='font-bold text-xl'>Reset Passphrase</div>
                  <div className='text-slate-600 text-sm'>
                    In the instance that you may have forgotten your passphrase,
                    use this button.
                  </div>
                </div>
                <ResetPassphraseButton />
              </div>
              <div className='flex flex-row items-center justify-between p-2'>
                <div>
                  <div className='font-bold text-xl'>Delete Account</div>
                  <div className='text-slate-600 text-sm'>
                    This will delete your plutarc account and irrevocably remove
                    all associated data from our servers.
                  </div>
                </div>
                <DeleteAccountButton />
              </div>
            </section>
          </ContentWrapper>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default ProfileSettingsDialog;
