"use client";
import Spinner from "@/components/Spinner";
import useCCXT from "@/hooks/useCCXT";
import { UserAPICredentials } from "@prisma/client";
import { Flex } from "@radix-ui/themes";
import { columns } from "./DataTable/columns";
import { DataTable } from "./DataTable/data-table";

const TradeHistoryTable = ({
  selectedApiKey,
}: {
  selectedApiKey: UserAPICredentials;
}) => {
  const { data: tradeData, isLoading } = useCCXT(
    selectedApiKey.exchange.toLowerCase(),
    selectedApiKey.apiKey,
    selectedApiKey.apiSecret,
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
      <DataTable columns={columns} data={tradeData?.data} />
    </>
  );
};

export default TradeHistoryTable;
