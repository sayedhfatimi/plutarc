import { Flex, Text } from '@radix-ui/themes';
import ResetPassphraseButton from './ResetPassphraseButton';

const ResetPassphrase = () => {
  return (
    <Flex direction='row' align='center' justify='between' className='p-2'>
      <Flex direction='column'>
        <Text className='text-xl font-bold'>Reset Passphrase</Text>
        <Text className='text-sm text-slate-600'>
          In the instance that you may have forgotten your passphrase, use this
          button.
        </Text>
      </Flex>
      <ResetPassphraseButton />
    </Flex>
  );
};

export default ResetPassphrase;
