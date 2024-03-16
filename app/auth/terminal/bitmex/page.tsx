'use client';
import TerminalSettingsDrawer from '@/app/auth/terminal/_components/TerminalSettingsDrawer';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  removeFromTerminalLayout,
  setTerminalLayout,
} from '@/lib/redux/features/user/userContext';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { Box, Flex } from '@radix-ui/themes';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { LuPartyPopper, LuX } from 'react-icons/lu';
import useWebSocket from 'react-use-websocket';
import { toast } from 'sonner';
import PageWrapper from '../../_components/PageWrapper';
import ConnectionStatus from '../_components/ConnectionStatus';
import BitmexOrderbook from './_components/BitmexOrderBook';
import BitmexTrades from './_components/BitmexTrades';
import TickerBar from './_components/TickerBar';
import '/node_modules/react-grid-layout/css/styles.css';
import '/node_modules/react-resizable/css/styles.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

const BitmexTerminalPage = () => {
  const searchParams = useSearchParams();
  const ticker = searchParams.get('ticker') || 'XBTUSD';

  const terminalLayout = useAppSelector(
    (state) => state.userContext.terminalLayout,
  );
  const showTickerBar = useAppSelector(
    (state) => state.userContext.showTickerBar,
  );

  const dispatch = useAppDispatch();

  const layoutChildren = [
    { key: 'Orderbook', node: <BitmexOrderbook ticker={ticker} /> },
    { key: 'RecentTrades', node: <BitmexTrades ticker={ticker} /> },
  ];

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
      <PageWrapper>
        {showTickerBar && <TickerBar ticker={ticker} />}
        <ResponsiveGridLayout
          className='layout'
          layouts={{
            lg: terminalLayout,
            md: terminalLayout,
          }}
          resizeHandles={['se']}
          useCSSTransforms={true}
          breakpoints={{ lg: 1200, md: 996 }}
          cols={{ lg: 50, md: 50 }}
          rowHeight={5}
          draggableCancel='.remove'
          onLayoutChange={(layout) => dispatch(setTerminalLayout(layout))}
        >
          {terminalLayout.map((item) => (
            <Box
              key={item.i}
              className='group relative border bg-white pl-1 pt-1 shadow-md dark:bg-slate-900'
            >
              <Box
                className='remove absolute right-1 top-1 z-50 h-4 w-4 animate-pulse cursor-pointer bg-slate-200 dark:bg-transparent md:hidden md:group-hover:block'
                onClick={() => dispatch(removeFromTerminalLayout(item))}
              >
                <LuX />
              </Box>
              {layoutChildren
                .filter((child) => child.key === item.i)
                .map((child) => child.node)}
            </Box>
          ))}
        </ResponsiveGridLayout>
      </PageWrapper>

      <Flex
        justify='between'
        align='center'
        className='absolute bottom-0 left-0 right-0 border bg-white px-2 py-2 shadow-md dark:bg-slate-900'
      >
        <Flex>
          <Badge>{ticker.toUpperCase()}</Badge>
        </Flex>
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger>
              <TerminalSettingsDrawer
                socketUrl='wss://ws.bitmex.com/realtime'
                exchange='Bitmex'
              />
            </TooltipTrigger>
            <TooltipContent>Terminal Settings</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <Box className='hidden md:block'>
          <ConnectionStatus
            socketUrl='wss://ws.bitmex.com/realtime'
            exchange='Bitmex'
          />
        </Box>
      </Flex>
    </>
  );
};

export default BitmexTerminalPage;
