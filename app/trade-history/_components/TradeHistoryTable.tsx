import Spinner from "@/components/Spinner";
import useCCXT from "@/hooks/useCCXT";
import { UserAPICredentials } from "@prisma/client";
import { Flex } from "@radix-ui/themes";
import TradeHistoryDataTable from "./TradeHistoryDataTable";

const TradeHistoryTable = ({
  apiKeysObj,
}: {
  apiKeysObj: UserAPICredentials;
}) => {
  const { data: tradeData, isLoading } = useCCXT(
    apiKeysObj.exchange.toLowerCase(),
    apiKeysObj.apiKey,
    apiKeysObj.apiSecret,
    "getTrades"
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