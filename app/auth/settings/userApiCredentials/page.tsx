'use client';
import NoAPIKeysAlert from '@/app/auth/_components/NoAPIKeysAlert';
import PageHeading from '@/app/auth/_components/PageHeading';
import { useAppSelector } from '@/lib/redux/hooks';
import { Box } from '@radix-ui/themes';
import DecryptApiKeys from '../../_components/DecryptApiKeys';
import AddApiKeyForm from './_components/AddApiKeyForm';
import UserApiKeysTable from './_components/UserApiKeysTable';

const UserAPICredentialsPage = () => {
  const apiKeysArr = useAppSelector((state) => state.apiKeys);
  const isEncrypted = useAppSelector((state) => state.userContext.isEncrypted);

  return (
    <Box className='border bg-background p-2 shadow-sm'>
      <PageHeading
        heading='Manage API Keys'
        description='manage your api keys here'
      >
        {isEncrypted && apiKeysArr.length !== 0 ? (
          <DecryptApiKeys />
        ) : (
          <AddApiKeyForm />
        )}
      </PageHeading>
      <Box className='border pb-2'>
        {apiKeysArr.length === 0 ? (
          <NoAPIKeysAlert />
        ) : (
          <UserApiKeysTable apiKeysArr={apiKeysArr} />
        )}
      </Box>
    </Box>
  );
};

export default UserAPICredentialsPage;
