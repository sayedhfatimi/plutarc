'use client';
import { Box, Flex } from '@radix-ui/themes';
import { useSearchParams } from 'next/navigation';
import { Responsive, WidthProvider } from 'react-grid-layout';
import BitmexOrderbook from './_components/BitmexOrderBook';
import BitmexTrades from './_components/BitmexTrades';
import TickerBar from './_components/TickerBar';
import '/node_modules/react-grid-layout/css/styles.css';
import '/node_modules/react-resizable/css/styles.css';
import useWebSocket from 'react-use-websocket';
import { toast } from 'sonner';
import { useEffect } from 'react';
import ConnectionStatus from './_components/ConnectionStatus';

const ResponsiveGridLayout = WidthProvider(Responsive);

const BitmexTerminalPage = () => {
  const searchParams = useSearchParams();
  const ticker = searchParams.get('ticker') || 'XBTUSD';

  const { sendJsonMessage } = useWebSocket(`wss://ws.bitmex.com/realtime`, {
    filter: (message) => {
      if (JSON.parse(message.data).success) {
        toast.success(`Connected to Bitmex WebSocket`, {
          description: `data: ${JSON.parse(message.data).subscribe}`,
        });
        return true;
      } else {
        return false;
      }
    },
    shouldReconnect: (closeEvent) => true,
    heartbeat: {
      message: 'ping',
      returnMessage: 'pong',
      timeout: 60 * 1000,
      interval: 30 * 1000,
    },
    share: true,
  });

  useEffect(() => {
    sendJsonMessage({
      op: 'unsubscribe',
      args: ['instrument', 'trade', 'orderBookL2_25'],
    });
    sendJsonMessage({
      op: 'subscribe',
      args: [
        `instrument:${ticker}`,
        `trade:${ticker}`,
        `orderBookL2_25:${ticker}`,
      ],
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ticker]);

  return (
    <>
      <Box className='h-full w-full border bg-slate-200 p-1 shadow-sm dark:bg-background'>
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
          cols={{ lg: 24, md: 12, sm: 6, xs: 4, xxs: 2 }}
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
      <Flex
        justify='between'
        className='absolute bottom-0 left-0 right-0 border bg-white py-2 shadow-md dark:bg-slate-800'
      >
        <Flex className='px-2 font-bold text-muted-foreground'>
          {ticker.toUpperCase()}
        </Flex>
        <ConnectionStatus />
      </Flex>
    </>
  );
};

const layout = [
  {
    i: 'BitmexOrderbook',
    x: 0,
    y: 0,
    w: 8,
    h: 15,
    minW: 8,
    minH: 15,
    isResizable: false,
    isBounded: true,
  },
  {
    i: 'BitmexTrades',
    x: 0,
    y: 0,
    w: 5,
    h: 16,
    isResizable: false,
    isBounded: true,
  },
];

export default BitmexTerminalPage;
