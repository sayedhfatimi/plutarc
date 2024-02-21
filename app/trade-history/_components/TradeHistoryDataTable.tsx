import { thTrade } from "@/entities/types";
import { columns } from "./DataTable/columns";
import { DataTable } from "./DataTable/data-table";

const TradeHistoryDataTable = ({ tradeData }: { tradeData: thTrade[] }) => {
  return (
    <>
      <DataTable columns={columns} data={tradeData} />
    </>
  );
};

export default TradeHistoryDataTable;
