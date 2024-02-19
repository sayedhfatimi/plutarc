import PageHeading from "@/components/PageHeading";
import { Box } from "@radix-ui/themes";

const TradeHistoryPage = () => {
  return (
    <>
      <Box className="border p-2 shadow-sm">
        <PageHeading
          heading="Trade History"
          description="Historical trade data"
        />
      </Box>
    </>
  );
};

export default TradeHistoryPage;
