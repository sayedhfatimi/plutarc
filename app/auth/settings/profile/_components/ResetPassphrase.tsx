import { Flex, Heading, Text } from '@radix-ui/themes';
import ResetPassphraseButton from './ResetPassphraseButton';

const ResetPassphrase = () => {
  return (
    <Flex direction='row' align='center' justify='between' className='p-2'>
      <Flex direction='column'>
        <Heading size='4'>Reset Passphrase</Heading>
        <Text size='1' color='gray'>
          In the instance that you may have forgotten your passphrase, use this
          button.
        </Text>
      </Flex>
      <ResetPassphraseButton />
    </Flex>
  );
};

export default ResetPassphrase;
