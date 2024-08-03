'use client';
import { useVault } from '@/Providers/VaultProvider';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ICON_SIZE_SMALL } from '@/lib/consts/UI';
import { LuUser2 } from 'react-icons/lu';

const AppTrayAvatar = () => {
  const userProfileImage = useVault((state) => state.user.profileImage);

  return (
    <Avatar className='size-6'>
      <AvatarImage src={userProfileImage} />
      <AvatarFallback>
        <div className='inline-flex items-center justify-center whitespace-nowrap rounded-md border border-input bg-background font-medium text-sm ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground'>
          <LuUser2 size={ICON_SIZE_SMALL} />
        </div>
      </AvatarFallback>
    </Avatar>
  );
};

export default AppTrayAvatar;
