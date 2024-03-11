'use client';
import { Box } from '@radix-ui/themes';
import { useSearchParams } from 'next/navigation';
import { Responsive, WidthProvider } from 'react-grid-layout';
import BitmexOrderbook from './_components/BitmexOrderBook';
import BitmexTrades from './_components/BitmexTrades';
import TickerBar from './_components/TickerBar';
import '/node_modules/react-grid-layout/css/styles.css';
import '/node_modules/react-resizable/css/styles.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

const BitmexTerminalPage = () => {
  const searchParams = useSearchParams();
  const ticker = searchParams.get('ticker') || 'XBTUSD';

  return (
    <>
      <Box className='border bg-slate-200 p-1 shadow-sm dark:bg-background'>
        <TickerBar ticker={ticker} />
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
            className='cursor-move border bg-white pl-1 pt-1 shadow-md dark:bg-slate-800'
            key='BitmexOrderbook'
          >
            <BitmexOrderbook ticker={ticker} />
          </Box>

          <Box
            className='cursor-move border bg-white pl-1 pt-1 shadow-md dark:bg-slate-800'
            key='BitmexTrades'
          >
            <BitmexTrades ticker={ticker} />
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
    isResizable: false,
    isBounded: true,
  },
  {
    i: 'BitmexTrades',
    x: 0,
    y: 0,
    w: 3,
    h: 16,
    minW: 3,
    minH: 16,
    isResizable: false,
    isBounded: true,
  },
];

export default BitmexTerminalPage;
