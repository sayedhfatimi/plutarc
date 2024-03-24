import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Avatar, Box, Flex, Text } from '@radix-ui/themes';
import { useSession } from 'next-auth/react';
import { LuSettings2, LuSkull, LuUser } from 'react-icons/lu';
import DeleteAccount from './DeleteAccount';
import ResetPassphrase from './ResetPassphrase';
import ContentWrapper from '../ContentWrapper';

const ProfileSettingsDialog = ({
  openState,
  setOpenState,
}: {
  openState: boolean;
  setOpenState: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { data: session } = useSession();

  return (
    <>
      <Dialog open={openState} onOpenChange={setOpenState}>
        <DialogContent className='max-w-screen-lg space-y-2'>
          <DialogHeader>
            <DialogTitle>
              <Flex align='center'>
                <LuSettings2 className='mr-2' />
                Profile Settings
              </Flex>
            </DialogTitle>
          </DialogHeader>
          <ContentWrapper>
            <Flex align='center' justify='between' className='p-4'>
              <Flex direction='column' gap='2'>
                <Text className='text-2xl font-bold'>{session?.user.name}</Text>
                <Text className='text-sm text-slate-600'>
                  {session?.user.email}
                </Text>
              </Flex>
              <Flex>
                <Avatar
                  size='8'
                  src={session?.user.image!}
                  fallback={<LuUser className='h-8 w-8' />}
                />
              </Flex>
            </Flex>
            <Flex direction='column' className='space-y-2 p-4'>
              <Box className='border-b p-2 text-red-800'>
                <Flex align='end' className='space-x-2'>
                  <LuSkull className='h-8 w-8' />
                  <Text className='text-xl font-bold'>Destructive Actions</Text>
                </Flex>
              </Box>
              <ResetPassphrase />
              <DeleteAccount />
            </Flex>
          </ContentWrapper>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProfileSettingsDialog;
