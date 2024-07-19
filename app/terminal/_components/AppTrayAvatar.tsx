'use client';
import { useAppSelector } from '@/lib/redux/hooks';
import * as Avatar from '@radix-ui/react-avatar';
import { LuUser2 } from 'react-icons/lu';

const AppTrayAvatar = () => {
  const userProfileImage = useAppSelector(
    (state) => state.userContext.userProfileImage,
  );

  return (
    <Avatar.Root>
      <Avatar.Image src={userProfileImage} width={32} height={32} />
      <Avatar.Fallback>
        <div className='inline-flex h-10 w-10 items-center justify-center whitespace-nowrap rounded-md border border-input bg-background text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground'>
          <LuUser2 size='16' />
        </div>
      </Avatar.Fallback>
    </Avatar.Root>
  );
};

export default AppTrayAvatar;
