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
import { Box, Flex } from '@radix-ui/themes';
import NoAPIKeysAlert from '../_components/NoAPIKeysAlert';
import { LuWallet } from 'react-icons/lu';
import ContentWrapper from '../_components/ContentWrapper';

const AccountDetailsPage = () => {
  const selectedApiKey = useAppSelector((state) => state.selectedApiKey);

  return (
    <>
      <Box className='h-full w-full border bg-slate-200 p-1 shadow-sm dark:bg-background'>
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
      </Box>
    </>
  );
};

export default AccountDetailsPage;
