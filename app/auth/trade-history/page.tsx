'use client';
import PageHeading from '@/app/auth/_components/PageHeading';
import { useAppSelector } from '@/lib/redux/hooks';
import { Box } from '@radix-ui/themes';
import TradeHistoryTable from './_components/TradeHistoryTable';
import NoAPIKeysAlert from '@/app/auth/_components/NoAPIKeysAlert';
import { LuHistory } from 'react-icons/lu';
import ContentWrapper from '../_components/ContentWrapper';

const TradeHistoryPage = () => {
  const selectedApiKey = useAppSelector((state) => state.selectedApiKey);

  return (
    <>
      <Box className='h-full w-full border bg-slate-200 p-1 shadow-sm dark:bg-background'>
        <PageHeading
          icon={<LuHistory />}
          heading='Trade History'
          description='Historical trade data'
        />
        <ContentWrapper>
          {Object.keys(selectedApiKey).length === 0 ? (
            <NoAPIKeysAlert />
          ) : (
            <TradeHistoryTable selectedApiKey={selectedApiKey} />
          )}
        </ContentWrapper>
      </Box>
    </>
  );
};

export default TradeHistoryPage;
