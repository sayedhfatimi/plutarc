import PageHeading from '@/app/auth/_components/PageHeading';
import { Box, Flex, Heading, Text } from '@radix-ui/themes';
import { LuSkull } from 'react-icons/lu';
import DeleteAccountButton from './_components/DeleteAccountButton';
import ResetPassphraseButton from './_components/ResetPassphraseButton';

const ProfilePage = () => {
  return (
    <Box className='border bg-background p-2 shadow-sm'>
      <PageHeading heading='Profile Settings' />
      <Box className='border pb-2'>
        <Flex direction='column' className='p-4' gap='4'>
          <Box className='border-b p-2 text-red-800'>
            <Flex align='end' gap='2'>
              <LuSkull className='h-8 w-8' />
              <Heading>Destructive Actions</Heading>
            </Flex>
          </Box>
          <Flex
            direction='row'
            align='center'
            justify='between'
            className='p-2'
          >
            <Flex direction='column'>
              <Heading size='4'>Reset Passphrase</Heading>
              <Text size='1' color='gray'>
                In the instance that you may have forgotten your passphrase, use
                this button.
              </Text>
            </Flex>
            <ResetPassphraseButton />
          </Flex>
          <Flex
            direction='row'
            align='center'
            justify='between'
            className='p-2'
          >
            <Flex direction='column'>
              <Heading size='4'>Delete Account</Heading>
              <Text size='1' color='gray'>
                This will delete your plutarc account and irrevocably remove all
                associated data from our servers.
              </Text>
            </Flex>
            <DeleteAccountButton />
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default ProfilePage;
