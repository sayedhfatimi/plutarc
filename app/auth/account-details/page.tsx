'use client';
import PageHeading from '@/app/auth/_components/PageHeading';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useAppSelector } from '@/lib/redux/hooks';
import { Flex } from '@radix-ui/themes';
import { LuWallet } from 'react-icons/lu';
import ContentWrapper from '../_components/ContentWrapper';
import NoAPIKeysAlert from '../_components/NoAPIKeysAlert';
import PageWrapper from '../_components/PageWrapper';

const AccountDetailsPage = () => {
  const selectedApiKey = useAppSelector((state) => state.selectedApiKey);

  return (
    <PageWrapper>
      <PageHeading
        icon={<LuWallet />}
        heading='Account Details'
        description={selectedApiKey.label}
      />
      <ContentWrapper>
        {Object.keys(selectedApiKey).length === 0 ? (
          <NoAPIKeysAlert />
        ) : (
          <Flex justify='between' gap='2'>
            <Flex>
              <Card>
                <CardHeader>
                  <CardTitle>Balances</CardTitle>
                  <CardDescription>
                    balances on {selectedApiKey.label}
                  </CardDescription>
                </CardHeader>
                <CardContent></CardContent>
              </Card>
            </Flex>
            <Flex>
              <Card>
                <CardHeader>
                  <CardTitle>Balances</CardTitle>
                  <CardDescription>
                    balances on {selectedApiKey.label}
                  </CardDescription>
                </CardHeader>
                <CardContent></CardContent>
              </Card>
            </Flex>
          </Flex>
        )}
      </ContentWrapper>
    </PageWrapper>
  );
};

export default AccountDetailsPage;
