'use client';
import { ICON_SIZE_SMALL } from '@/lib/consts/UI';
import { useAppSelector } from '@/lib/redux/hooks';
import * as Avatar from '@radix-ui/react-avatar';
import { LuUser2 } from 'react-icons/lu';

const AppTrayAvatar = () => {
  const userProfileImage = useAppSelector(
    (state) => state.userContext.user.profileImage,
  );

  return (
    <Avatar.Root>
      <Avatar.Image src={userProfileImage} width={24} height={24} />
      <Avatar.Fallback>
        <div className='inline-flex size-6 items-center justify-center whitespace-nowrap rounded-md border border-input bg-background font-medium text-sm ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground'>
          <LuUser2 size={ICON_SIZE_SMALL} />
        </div>
      </Avatar.Fallback>
    </Avatar.Root>
  );
};

export default AppTrayAvatar;
