import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useAppSelector } from '@/lib/redux/hooks';
import { Flex } from '@radix-ui/themes';
import { LuKeyRound } from 'react-icons/lu';
import ContentWrapper from '../ContentWrapper';
import AddApiKeyForm from './AddApiKeyForm';
import DecryptApiKeys from './DecryptApiKeys';
import NoAPIKeysAlert from './NoAPIKeysAlert';
import UserApiKeysTable from './UserApiKeysTable';

const UserApiKeysDialog = ({
  openState,
  setOpenState,
}: {
  openState: boolean;
  setOpenState: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const apiKeysArr = useAppSelector((state) => state.apiKeys); // get apiKeys from redux store
  const isEncrypted = useAppSelector((state) => state.userContext.isEncrypted); // get isEncrypted status from redux store

  return (
    <Dialog open={openState} onOpenChange={setOpenState}>
      <DialogContent className='max-w-screen-lg space-y-2'>
        <DialogHeader>
          <Flex justify='between' align='center' className='pr-6'>
            <DialogTitle>
              <Flex align='center'>
                <LuKeyRound className='mr-2' />
                Manage API Keys
              </Flex>
            </DialogTitle>
            {isEncrypted && apiKeysArr.length !== 0 ? (
              <DecryptApiKeys />
            ) : (
              <AddApiKeyForm />
            )}
          </Flex>
        </DialogHeader>
        <ContentWrapper>
          {apiKeysArr.length === 0 ? (
            <NoAPIKeysAlert />
          ) : (
            <UserApiKeysTable apiKeysArr={apiKeysArr} />
          )}
        </ContentWrapper>
      </DialogContent>
    </Dialog>
  );
};

export default UserApiKeysDialog;
