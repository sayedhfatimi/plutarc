'use client';
import { Box, Flex, Heading } from '@radix-ui/themes';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { MemoBitmexOrderbook } from './_components/BitmexOrderBook';
import { MemoBitmexTrades } from './_components/BitmexTrades';
import TickerSelector from './_components/TickerSelector';
import '/node_modules/react-grid-layout/css/styles.css';
import '/node_modules/react-resizable/css/styles.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

const TerminalPage = () => {
  return (
    <>
      <Box className='border bg-slate-100 p-1 shadow-sm dark:bg-background'>
        <Flex
          justify='between'
          align='center'
          className='mb-1 bg-white p-1 dark:bg-slate-900'
        >
          <Box className='text-right'>
            <Heading size='1'>Last Price</Heading>
            <Heading size='1'>High Price</Heading>
            <Heading size='1'>Low Price</Heading>
            <Heading size='1'>Vol</Heading>
          </Box>
          <Box>
            <TickerSelector />
          </Box>
        </Flex>
        <ResponsiveGridLayout
          className='layout'
          layouts={{
            lg: layout,
            md: layout,
            sm: layout,
            xs: layout,
            xxs: layout,
          }}
          resizeHandles={['se']}
          useCSSTransforms={true}
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
          rowHeight={5}
        >
          <Box
            className='border bg-white pl-1 pt-1 dark:bg-slate-800'
            key='BitmexOrderbook'
          >
            <MemoBitmexOrderbook />
          </Box>

          <Box
            className='border bg-white pl-1 pt-1 dark:bg-slate-800'
            key='BitmexTrades'
          >
            <MemoBitmexTrades />
          </Box>
        </ResponsiveGridLayout>
      </Box>
    </>
  );
};

const layout = [
  {
    i: 'BitmexOrderbook',
    x: 0,
    y: 0,
    w: 3,
    h: 16,
    minW: 3,
    minH: 16,
  },
  {
    i: 'BitmexTrades',
    x: 0,
    y: 0,
    w: 3,
    h: 16,
    minW: 3,
    minH: 16,
  },
];

export default TerminalPage;
