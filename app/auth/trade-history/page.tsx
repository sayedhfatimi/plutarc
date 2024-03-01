'use client';
import PageHeading from '@/app/auth/_components/PageHeading';
import { useAppSelector } from '@/lib/redux/hooks';
import { Box } from '@radix-ui/themes';
import TradeHistoryTable from './_components/TradeHistoryTable';
import NoAPIKeysAlert from '@/app/auth/_components/NoAPIKeysAlert';

const TradeHistoryPage = () => {
  const selectedApiKey = useAppSelector((state) => state.selectedApiKey);

  return (
    <>
      <Box className='border bg-background p-2 shadow-sm'>
        <PageHeading
          heading='Trade History'
          description='Historical trade data'
        />
        <Box className='border pb-2'>
          {Object.keys(selectedApiKey).length === 0 ? (
            <NoAPIKeysAlert />
          ) : (
            <TradeHistoryTable selectedApiKey={selectedApiKey} />
          )}
        </Box>
      </Box>
    </>
  );
};

export default TradeHistoryPage;
