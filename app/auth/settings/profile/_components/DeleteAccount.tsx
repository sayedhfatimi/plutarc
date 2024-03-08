import { Flex, Heading, Text } from '@radix-ui/themes';
import DeleteAccountButton from './DeleteAccountButton';

const DeleteAccount = () => {
  return (
    <Flex direction='row' align='center' justify='between' className='p-2'>
      <Flex direction='column'>
        <Heading size='4'>Delete Account</Heading>
        <Text size='1' color='gray'>
          This will delete your plutarc account and irrevocably remove all
          associated data from our servers.
        </Text>
      </Flex>
      <DeleteAccountButton />
    </Flex>
  );
};

export default DeleteAccount;
