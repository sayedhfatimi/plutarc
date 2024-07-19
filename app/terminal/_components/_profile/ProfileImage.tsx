'use client';
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
        width='96'
        height='96'
      />
      <UploadButton
        endpoint='imageUploader'
        content={{
          button({ ready }) {
            if (ready)
              return (
                <div className='w-24 text-center text-sm font-bold'>
                  Change Profile Image
                </div>
              );
            return 'Getting Ready...';
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
