import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ReloadIcon } from '@radix-ui/react-icons';
import { Avatar, Flex, Text } from '@radix-ui/themes';
import { signOut, useSession } from 'next-auth/react';
import { useState } from 'react';
import { LuBookKey, LuLogOut, LuUser } from 'react-icons/lu';
import ProfileSettingsDialog from './Profile/ProfileSettingsDialog';
import UserApiKeysDialog from './UserApiKeys/UserApiKeysDialog';
const ProfileMenu = () => {
  const { status, data: session } = useSession();
  const [openProfileSettings, setOpenProfileSettings] = useState(false);
  const [openUserApiKeys, setOpenUserApiKeys] = useState(false);

  if (status === 'loading')
    return <ReloadIcon className='mr-4 h-4 w-4 animate-spin' />;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar
            src={session!.user!.image!}
            fallback={<LuUser />}
            size='2'
            className='mr-2 cursor-pointer'
            referrerPolicy='no-referrer'
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>
            <Text size='2' className='text-slate-600'>
              {session!.user!.email!}
            </Text>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            asChild
            onClick={() => setOpenProfileSettings(true)}
          >
            <Flex align='center'>
              <LuUser className='mr-2' /> Profile
            </Flex>
          </DropdownMenuItem>
          <DropdownMenuItem asChild onClick={() => setOpenUserApiKeys(true)}>
            <Flex align='center'>
              <LuBookKey className='mr-2' />
              API Keys
            </Flex>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => signOut({ callbackUrl: '/' })}>
            <LuLogOut className='mr-2' />
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ProfileSettingsDialog
        openState={openProfileSettings}
        setOpenState={setOpenProfileSettings}
      />

      <UserApiKeysDialog
        openState={openUserApiKeys}
        setOpenState={setOpenUserApiKeys}
      />
    </>
  );
};

export default ProfileMenu;
