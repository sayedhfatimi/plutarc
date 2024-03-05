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

const AccountDetailsPage = () => {
  const selectedApiKey = useAppSelector((state) => state.selectedApiKey);

  return (
    <>
      <Box className='border bg-background p-2 shadow-sm'>
        <PageHeading
          heading='Account Details'
          description={selectedApiKey.label}
        />
        <Box className='border p-2'>
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
        </Box>
      </Box>
    </>
  );
};

export default AccountDetailsPage;
