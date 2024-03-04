'use client';
import { Flex, Grid } from '@radix-ui/themes';
import BitmexOrderbook from './_components/BitmexOrderBook';
import BitmexTrades from './_components/BitmexTrades';

const TerminalPage = () => {
  return (
    <>
      <Grid columns='2' gap='4' className='border bg-background p-2 shadow-sm'>
        <BitmexOrderbook />
        <BitmexTrades />
      </Grid>
    </>
  );
};

export default TerminalPage;
