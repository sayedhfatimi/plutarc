import Spinner from "@/components/Spinner";
import useGetTrades from "@/hooks/useGetTrades";
import { UserAPICredentials } from "@prisma/client";
import { Flex } from "@radix-ui/themes";
import TradeHistoryDataTable from "./TradeHistoryDataTable";

const TradeHistoryTable = ({
  apiKeysObj,
}: {
  apiKeysObj: UserAPICredentials;
}) => {
  const { data: tradeData, isLoading } = useGetTrades(
    apiKeysObj.exchange,
    apiKeysObj.apiKey,
    apiKeysObj.apiSecret
  );

  if (isLoading)
    return (
      <Flex justify="center" align="center" p="9">
        <Spinner />
      </Flex>
    );

  return (
    <>
      <TradeHistoryDataTable tradeData={tradeData?.data} />
    </>
  );
};

export default TradeHistoryTable;
