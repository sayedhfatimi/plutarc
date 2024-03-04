'use client';
import { Box } from '@radix-ui/themes';
import BitmexOrderbook from './_components/BitmexOrderBook';

const TerminalPage = () => {
  return (
    <>
      <Box className='border bg-background p-2 shadow-sm'>
        <BitmexOrderbook />
      </Box>
    </>
  );
};

export default TerminalPage;
