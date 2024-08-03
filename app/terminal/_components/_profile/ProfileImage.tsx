'use client';
import { useVault } from '@/Providers/VaultProvider';
import {
  PROFILE_DIALOG_IMAGE_HEIGHT,
  PROFILE_DIALOG_IMAGE_WIDTH,
} from '@/lib/consts/UI';
import defaultpp from '@/public/images/default-pp.jpg';
import Image from 'next/image';

const ProfileImage = () => {
  const userProfileImage = useVault((state) => state.user.profileImage);

  return (
    <div className='flex flex-col'>
      <Image
        src={userProfileImage || defaultpp}
        alt='User Avatar'
        width={PROFILE_DIALOG_IMAGE_WIDTH}
        height={PROFILE_DIALOG_IMAGE_HEIGHT}
      />
    </div>
  );
};

export default ProfileImage;
