import ContentWrapper from '@/components/ContentWrapper';
import PasskeyRegister from '@/components/PasskeyRegister';
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { auth } from '@/lib/auth';
import {
  ICON_SIZE_LARGE,
  ICON_SIZE_MEDIUM,
  ICON_SIZE_SMALL,
} from '@/lib/consts/UI';
import { LuSettings2, LuSkull, LuUser } from 'react-icons/lu';
import DropdownDialogItem from '../DropdownDialogItem';
import DeleteAccountButton from './DeleteAccountButton';
import ProfileImage from './ProfileImage';
import ResetPassphraseButton from './ResetPassphraseButton';

const ProfileSettingsDialog = async () => {
  const session = await auth();

  return (
    <>
      <DropdownDialogItem
        triggerIcon={<LuUser size={ICON_SIZE_SMALL} />}
        triggerTitle='Profile'
      >
        <DialogHeader>
          <DialogTitle className='flex flex-row items-center space-x-2'>
            <LuSettings2 size={ICON_SIZE_MEDIUM} />
            <span>Profile Settings</span>
          </DialogTitle>
          <DialogDescription>Edit Profile Settings Here</DialogDescription>
        </DialogHeader>
        <ContentWrapper className='space-y-4 p-4'>
          <section className='flex items-start justify-between'>
            <div className='flex flex-col space-y-2'>
              <div className='text-2xl font-bold'>
                Name: {session?.user.name || 'No Name'}
              </div>
              <div className='text-sm text-slate-600'>
                email: {session?.user.email}
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
              <span className='text-xl font-bold'>Destructive Actions</span>
            </div>
            <div className='flex flex-row items-center justify-between p-2'>
              <div>
                <div className='text-xl font-bold'>Reset Passphrase</div>
                <div className='text-sm text-slate-600'>
                  In the instance that you may have forgotten your passphrase,
                  use this button.
                </div>
              </div>
              <ResetPassphraseButton />
            </div>
            <div className='flex flex-row items-center justify-between p-2'>
              <div>
                <div className='text-xl font-bold'>Delete Account</div>
                <div className='text-sm text-slate-600'>
                  This will delete your plutarc account and irrevocably remove
                  all associated data from our servers.
                </div>
              </div>
              <DeleteAccountButton />
            </div>
          </section>
        </ContentWrapper>
      </DropdownDialogItem>
    </>
  );
};

export default ProfileSettingsDialog;
