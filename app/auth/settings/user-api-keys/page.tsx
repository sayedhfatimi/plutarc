'use client';
import DecryptApiKeys from '@/app/auth/_components/DecryptApiKeys';
import NoAPIKeysAlert from '@/app/auth/_components/NoAPIKeysAlert';
import PageHeading from '@/app/auth/_components/PageHeading';
import { useAppSelector } from '@/lib/redux/hooks';
import { Box } from '@radix-ui/themes';
import AddApiKeyForm from './_components/AddApiKeyForm';
import UserApiKeysTable from './_components/UserApiKeysTable';
import { LuKeyRound } from 'react-icons/lu';
import ContentWrapper from '../../_components/ContentWrapper';

const UserAPIKeysPage = () => {
  const apiKeysArr = useAppSelector((state) => state.apiKeys); // get apiKeys from redux store
  const isEncrypted = useAppSelector((state) => state.userContext.isEncrypted); // get isEncrypted status from redux store

  return (
    <Box className='h-full w-full border bg-slate-200 p-1 shadow-sm dark:bg-background'>
      <PageHeading
        icon={<LuKeyRound />}
        heading='Manage API Keys'
        description='manage your api keys here'
      >
        {isEncrypted && apiKeysArr.length !== 0 ? (
          <DecryptApiKeys />
        ) : (
          <AddApiKeyForm />
        )}
      </PageHeading>
      <ContentWrapper>
        {apiKeysArr.length === 0 ? (
          <NoAPIKeysAlert />
        ) : (
          <UserApiKeysTable apiKeysArr={apiKeysArr} />
        )}
      </ContentWrapper>
    </Box>
  );
};

export default UserAPIKeysPage;
