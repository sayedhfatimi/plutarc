'use client';
import Spinner from '@/components/Spinner';
import {
  PROFILE_DIALOG_IMAGE_HEIGHT,
  PROFILE_DIALOG_IMAGE_WIDTH,
} from '@/lib/consts/UI';
import { setUserProfileImage } from '@/lib/redux/features/userContext';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { UploadButton } from '@/lib/uploadthing';
import defaultpp from '@/public/images/default-pp.jpg';
import Image from 'next/image';

const ProfileImage = () => {
  const userProfileImage = useAppSelector(
    (state) => state.userContext.userProfileImage,
  );
  const dispatch = useAppDispatch();

  return (
    <div className='flex flex-col'>
      <Image
        src={userProfileImage || defaultpp}
        alt='User Avatar'
        width={PROFILE_DIALOG_IMAGE_WIDTH}
        height={PROFILE_DIALOG_IMAGE_HEIGHT}
      />
      <UploadButton
        endpoint='imageUploader'
        content={{
          button({ ready }) {
            if (ready)
              return (
                <div className='w-24 text-center font-bold text-muted-foreground text-sm hover:cursor-pointer hover:text-black dark:hover:text-white'>
                  Change Profile Image
                </div>
              );
            return (
              <div className='w-24 text-center font-bold text-muted-foreground text-sm hover:cursor-pointer hover:text-black dark:hover:text-white'>
                Getting Ready...
              </div>
            );
          },
          allowedContent({ isUploading }) {
            if (isUploading) return <Spinner />;
          },
        }}
        onClientUploadComplete={(res) => {
          dispatch(setUserProfileImage(res[0].url));
        }}
      />
    </div>
  );
};

export default ProfileImage;
