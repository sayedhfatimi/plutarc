'use client';
import { Badge } from '@/components/ui/badge';
import { Box, Flex } from '@radix-ui/themes';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { LuPartyPopper } from 'react-icons/lu';
import useWebSocket from 'react-use-websocket';
import { toast } from 'sonner';
import BitmexOrderbook from './_components/BitmexOrderBook';
import BitmexTrades from './_components/BitmexTrades';
import ConnectionStatus from './_components/ConnectionStatus';
import TickerBar from './_components/TickerBar';
import '/node_modules/react-grid-layout/css/styles.css';
import '/node_modules/react-resizable/css/styles.css';
import { useAppSelector } from '@/lib/redux/hooks';

const ResponsiveGridLayout = WidthProvider(Responsive);

const BitmexTerminalPage = () => {
  const searchParams = useSearchParams();
  const ticker = searchParams.get('ticker') || 'XBTUSD';

  const showStatusBar = useAppSelector(
    (state) => state.userContext.showStatusBar,
  );

  const [gridLayout, setGridLayout] = useState(layout);

  const { sendJsonMessage } = useWebSocket(`wss://ws.bitmex.com/realtime`, {
    filter: (message) => {
      if (JSON.parse(message.data).success) {
        toast.success(`Connected to Bitmex WebSocket`, {
          description: `data: ${JSON.parse(message.data).subscribe}`,
          icon: <LuPartyPopper />,
          closeButton: true,
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
            lg: gridLayout,
            md: gridLayout,
            sm: gridLayout,
            xs: gridLayout,
            xxs: gridLayout,
          }}
          resizeHandles={['se']}
          useCSSTransforms={true}
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          cols={{ lg: 50, md: 50, sm: 6, xs: 4, xxs: 2 }}
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
      {showStatusBar && (
        <Flex
          justify='between'
          className='absolute bottom-0 left-0 right-0 border bg-white py-2 shadow-md dark:bg-slate-800'
        >
          <Flex className='px-2'>
            <Badge>{ticker.toUpperCase()}</Badge>
          </Flex>
          <ConnectionStatus />
        </Flex>
      )}
    </>
  );
};

const layout = [
  {
    i: 'BitmexOrderbook',
    x: 0,
    y: 0,
    w: 18,
    h: 15,
    isResizable: false,
    isBounded: true,
  },
  {
    i: 'BitmexTrades',
    x: 0,
    y: 0,
    w: 18,
    h: 15,
    isResizable: false,
    isBounded: true,
  },
];

export default BitmexTerminalPage;
