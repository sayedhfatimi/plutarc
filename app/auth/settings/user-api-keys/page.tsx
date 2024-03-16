'use client';
import DecryptApiKeys from '@/app/auth/_components/DecryptApiKeys';
import NoAPIKeysAlert from '@/app/auth/_components/NoAPIKeysAlert';
import PageHeading from '@/app/auth/_components/PageHeading';
import { useAppSelector } from '@/lib/redux/hooks';
import { LuKeyRound } from 'react-icons/lu';
import ContentWrapper from '../../_components/ContentWrapper';
import PageWrapper from '../../_components/PageWrapper';
import AddApiKeyForm from './_components/AddApiKeyForm';
import UserApiKeysTable from './_components/UserApiKeysTable';

const UserAPIKeysPage = () => {
  const apiKeysArr = useAppSelector((state) => state.apiKeys); // get apiKeys from redux store
  const isEncrypted = useAppSelector((state) => state.userContext.isEncrypted); // get isEncrypted status from redux store

  return (
    <PageWrapper>
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
    </PageWrapper>
  );
};

export default UserAPIKeysPage;
