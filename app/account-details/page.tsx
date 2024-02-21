"use client";
import NoAPIKeysAlert from "@/components/NoAPIKeysAlert";
import PageHeading from "@/components/PageHeading";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useCCXT from "@/hooks/useCCXT";
import { useAppSelector } from "@/lib/redux/hooks";
import { Box, Flex } from "@radix-ui/themes";

const AccountDetailsPage = () => {
  const selectedApiKey = useAppSelector((state) => state.selectedApiKey);

  //   const { data: balanceData, isLoading } = useCCXT(
  //     selectedApiKey.exchange.toLowerCase(),
  //     selectedApiKey.apiKey,
  //     selectedApiKey.apiSecret,
  //     "getBalances"
  //   );

  return (
    <>
      <Box className="border p-2 shadow-sm">
        <PageHeading
          heading="Account Details"
          description={selectedApiKey.label}
        />
        <Box className="border p-2">
          <Flex justify="between" gap="2">
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
