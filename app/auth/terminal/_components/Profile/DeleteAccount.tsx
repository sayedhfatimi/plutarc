import { Flex, Text } from '@radix-ui/themes';
import DeleteAccountButton from './DeleteAccountButton';

const DeleteAccount = () => {
  return (
    <Flex direction='row' align='center' justify='between' className='p-2'>
      <Flex direction='column'>
        <Text className='text-xl font-bold'>Delete Account</Text>
        <Text className='text-sm text-slate-600'>
          This will delete your plutarc account and irrevocably remove all
          associated data from our servers.
        </Text>
      </Flex>
      <DeleteAccountButton />
    </Flex>
  );
};

export default DeleteAccount;
