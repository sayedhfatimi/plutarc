'use client';
import PageHeading from '@/app/auth/_components/PageHeading';
import { useAppSelector } from '@/lib/redux/hooks';
import { Avatar, Box, Flex, Heading, Text } from '@radix-ui/themes';
import { useSession } from 'next-auth/react';
import { LuSkull, LuUser } from 'react-icons/lu';
import DeleteAccount from './_components/DeleteAccount';
import ResetPassphrase from './_components/ResetPassphrase';

const ProfilePage = () => {
  const { data: session } = useSession();
  const apiKey = useAppSelector((state) => state.apiKeys.length);

  if (session)
    return (
      <Box className='border bg-background p-2 shadow-sm'>
        <PageHeading heading='Profile Settings'>
          <Flex direction='column' align='end'>
            <Heading>Total API Keys: {apiKey}</Heading>
            <Text size='2' color='gray'>
              Session Expires: {new Date(session.expires).toUTCString()}
            </Text>
          </Flex>
        </PageHeading>
        <Box className='border pb-2'>
          <Flex align='center' justify='between' className='p-4'>
            <Flex direction='column' gap='2'>
              <Heading size='8'>
                {session?.user.name ||
                  session?.user.publicAddress.toLowerCase()}
              </Heading>
              <Text size='1' color='gray'>
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
          <Flex direction='column' className='p-4' gap='4'>
            <Box className='border-b p-2 text-red-800'>
              <Flex align='end' gap='2'>
                <LuSkull className='h-8 w-8' />
                <Heading>Destructive Actions</Heading>
              </Flex>
            </Box>
            <ResetPassphrase />
            <DeleteAccount />
          </Flex>
        </Box>
      </Box>
    );
};

export default ProfilePage;
